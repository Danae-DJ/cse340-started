// *******************************
// Support Ticket Routes
// *******************************
const express = require("express")
const router = new express.Router()
const supportController = require("../controllers/supportController")
const utilities = require("../utilities/")
const regValidate = require("../utilities/support-validation")


// ====================
// PUBLIC ROUTES
// ====================
//Form to create a ticket
router.get(
    "/",
    utilities.handleErrors(supportController.buildSupportForm)
)

//Process ticket creation
router.post(
    "/",
    regValidate.supportRules(),
    regValidate.checkSupportData,
    utilities.handleErrors(supportController.createTicket)
)

// ============================
// ADMIN / EMPLOYEE ROUTES
// ============================
//View ticket list
router.get(
  "/manage",
  utilities.checkAdminEmployee,
  utilities.handleErrors(supportController.buildManageTickets)
)

//See individual ticket
router.get(
  "/:ticket_id",
  utilities.checkAdminEmployee,
  utilities.handleErrors(supportController.viewTicket)
)

//Change status to “Closed”
router.post(
  "/:ticket_id",
  utilities.checkAdminEmployee,
  utilities.handleErrors(supportController.updateTicketStatus)
)

module.exports = router