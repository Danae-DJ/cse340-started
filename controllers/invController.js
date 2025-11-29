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
    errors: null,
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
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}

/* ******************************
*  Build inventory management view
* ************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav();
  const classificationSelect = await utilities.buildClassificationList()
res.status(201).render("inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
    classificationSelect,
  });
};

/* ******************************
*  Build inventory Add Classification view
* ************************** */
invCont.buildAddClassificationView = async function (req, res, next) {
let nav = await utilities.getNav();
res.status(201).render("inventory/add-classification", {
    title: "Classification",
    nav,
    errors: null,
  });
};

/* ******************************
*  Build inventory Add Inventory view
* ************************** */
invCont.buildAddInventoryView = async function (req, res, next) {
let nav = await utilities.getNav();
res.status(201).render("inventory/add-inventory", {
    title: "Inventory",
    nav,
    errors: null,
  });
};

/* ******************************
*  Return Inventory by Classification As JSON
*  Unit 5, Select Inv Item Activity
* ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

module.exports = invCont