const { body, validationResult } = require("express-validator")

/* *************************************
 * Validation rules for creating a ticket
 ************************************* */
const supportRules = () => {
  return [
    body("ticket_subject")
      .trim()
      .notEmpty()
      .withMessage("Please provide a subject.")
      .isLength({ max: 100 })
      .withMessage("Subject must not exceed 100 characters."),

    body("ticket_message")
      .trim()
      .notEmpty()
      .withMessage("Message cannot be empty.")
      .isLength({ max: 2500 })
      .withMessage("Message cannot exceed 2500 characters."),
  ]
}

/* **********************************************
 * Check validation results
 ********************************************** */
const checkSupportData = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const { ticket_subject, ticket_message } = req.body

    return res.render("support/support", {
      title: "Create Support Ticket",
      errors,
      ticket_subject,
      ticket_message,
    })
  }

  next()
}

module.exports = {
  supportRules,
  checkSupportData,
}
