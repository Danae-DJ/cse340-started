/* ***********************
 * Account: Process Registration
 * Unit 4, Account Model
 * ************************/
const pool = require("../database/")

/* *****************************
*   Register new account
*   Unit 4, Process Registration Activity
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_type, account_password){
  try {
    const sql = `INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password, account_type])
  } catch (error) {
    return error.message
  }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email){
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail (account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}

/* *****************************
* Get account by ID//DON'T TOUCH (addded type)
I CAN WATCH YOU!!! DON'T TOUCH!!!
* ***************************** */
async function getAccountById(account_id) {
  try {
    const sql = `SELECT account_id, account_firstname, account_lastname, account_email, account_type FROM account WHERE account_id = $1`
    const result = await pool.query(sql, [account_id])
    return result.rows[0]
  } catch (error) {
    return error.message
  }
}


/* *****************************
* Update account information
* Unit 5, Update Account Activity
* ***************************** */
async function updateAccount(
  account_id,
  account_firstname,
  account_lastname,
  account_email,
  account_type
) {
  try {
    const sql = ` UPDATE account SET account_firstname = $1, account_lastname = $2, account_email = $3, account_type = $4 WHERE account_id = $5 RETURNING *`
    const result = await pool.query(sql, [account_firstname, account_lastname, account_email, account_type, account_id])
    return result.rows[0]
  }
  catch (error) {
    return null
  }
}

/* *****************************
* Update: Account Password
* Unit 5
* ***************************** */
async function updatePassword(account_id, account_password) {
  try {
    const sql = `UPDATE account SET account_password = $1 WHERE account_id = $2 RETURNING *`
    const result = await pool.query(sql, [account_password, account_id])
    return result.rows[0]
  }
  catch (error) {
    console.log(error)
    return null
  }
}

module.exports = {
  registerAccount,
  checkExistingEmail,
  getAccountByEmail,
  getAccountById,
  updateAccount,
  updatePassword
}