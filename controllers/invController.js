const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory detail view
 * ************************** */
invCont.buildByInvId = async function (req, res, next) {
  try {
    const invId = req.params.invId
    const vehicleData = await invModel.getVehicleById(invId)

    if (!vehicleData) {
      return res.status(404).send("Vehicle not found")
    }

    let nav = await utilities.getNav()
    const pageHTML = await utilities.buildDetailView(vehicleData)

    res.render("./inventory/details", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav,
      pageHTML,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = invCont