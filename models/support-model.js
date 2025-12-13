/**************************************
 * support-model.js
 **************************************/
const pool = require("../database/")

/* Create ticket */
async function createTicket(account_id, subject, message) {
  const sql = `
    INSERT INTO support_tickets
      (account_id, ticket_subject, ticket_message)
    VALUES ($1, $2, $3)
    RETURNING ticket_id
  `
  const result = await pool.query(sql, [account_id, subject, message])
  return result.rows[0]
}

/* Tickets by account */
async function getTicketsByAccount(account_id) {
  const sql = `
    SELECT ticket_id, ticket_subject, ticket_message, ticket_status,
           to_char(ticket_created, 'YYYY-MM-DD HH24:MI') AS ticket_created
    FROM support_tickets
    WHERE account_id = $1
    ORDER BY ticket_created DESC
  `
  const result = await pool.query(sql, [account_id])
  return result.rows
}

/* All tickets (Employee/Admin) */
async function getAllTickets() {
  try {
    const sql = `
    SELECT t.ticket_id, t.ticket_subject, t.ticket_message, t.ticket_status,
           to_char(t.ticket_created, 'YYYY-MM-DD HH24:MI') AS ticket_created,
           a.account_firstname, a.account_lastname, a.account_email
    FROM support_tickets t
    JOIN account a ON t.account_id = a.account_id
    ORDER BY t.ticket_status ASC, t.ticket_created DESC
  `
    const result = await pool.query(sql)
    return result.rows
  } catch (error) {
    console.error("getAllTickets error:", error)
  }
}

/* Ticket by ID */
async function getTicketById(ticket_id) {
  const sql = `
    SELECT t.*, 
           to_char(t.ticket_created, 'YYYY-MM-DD HH24:MI') AS ticket_created,
           a.account_firstname, a.account_lastname, a.account_email
    FROM support_tickets t
    JOIN account a ON t.account_id = a.account_id
    WHERE ticket_id = $1
  `
  const result = await pool.query(sql, [ticket_id])
  return result.rows[0]
}

/* Update status */
async function updateTicketStatus(ticket_id, status) {
  const sql = `
    UPDATE support_tickets
    SET ticket_status = $1
    WHERE ticket_id = $2
  `
  await pool.query(sql, [status, ticket_id])
}

module.exports = {
  createTicket,
  getTicketsByAccount,
  getAllTickets,
  getTicketById,
  updateTicketStatus
}
