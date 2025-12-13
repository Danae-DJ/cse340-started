/* ************************************
 * Support Controller
 * Unit 6: tickes for support
 *************************************/
const supportModel = require("../models/support-model")
const utilities = require("../utilities/")

async function buildSupportForm(req, res) {
  let nav = await utilities.getNav()
  res.render("support/support", {
    title: "Create Support Ticket",
    nav,
    errors: null,
    ticket_subject: "",
    ticket_message: "",
  })
}

async function createTicket(req, res) {
  let nav = await utilities.getNav()
  const { ticket_subject, ticket_message } = req.body
  const account_id = res.locals.accountData.account_id

  try {
    await supportModel.createTicket(account_id, ticket_subject, ticket_message)
    req.flash("notice", "Your support ticket was successfully created.")
    res.redirect("/")
  } catch (error) {
    res.render("support/support", {
      title: "Create Support Ticket",
      nav,
      errors: null,
      ticket_subject,
      ticket_message,
    })
  }
}

async function buildManageTickets(req, res) {
  let nav = await utilities.getNav()
  const role = res.locals.accountData.account_type
  const account_id = res.locals.accountData.account_id

  const tickets =
    role === "Employee" || role === "Admin"
      ? await supportModel.getAllTickets()
      : await supportModel.getTicketsByAccount(account_id)

  res.render("support/manage", {
    title: "Support Tickets",
    nav,
    tickets,
    errors: null,
  })
}

async function viewTicket(req, res) {
  let nav = await utilities.getNav()
  const ticket = await supportModel.getTicketById(req.params.ticket_id)

  if (!ticket) {
    req.flash("notice", "Ticket not found.")
    return res.redirect("/support/manage")
  }

  res.render("support/ticket-view", {
    title: `Ticket #${ticket.ticket_id}`,
    nav,
    ticket,
    errors: null,
  })
}

async function updateTicketStatus(req, res) {
  const { ticket_status } = req.body
  const ticket_id = req.params.ticket_id

  await supportModel.updateTicketStatus(ticket_id, ticket_status)
  req.flash("notice", "Ticket updated.")
  res.redirect(`/support/${ticket_id}`)
}

module.exports = {
  buildSupportForm,
  createTicket,
  buildManageTickets,
  viewTicket,
  updateTicketStatus,
}