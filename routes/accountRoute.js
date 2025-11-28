/* ***********************
 * Account routes
 * Unit 4, delever login view activity
 * ************************/
//Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')

/* ***********************
 * Deliver login view
 * Unit 4, delever login view activity
 * ************************/
router.get("/login", utilities.handleErrors(accountController.buildLogin))

/* ***********************
 * Deliver login view
 * Unit 4, delever registration view activity
 * ************************/
router.get("/register", utilities.handleErrors(accountController.buildRegister))

/* ***********************
 * Unit 5, Account Management View
 * ************************/
router.get("/account-management", utilities.handleErrors(accountController.accountLogin))

/* ***********************
 * Deliver login view
 * Unit 4, Process the registration data
 * ************************/
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

/* ***********************
 * Process Login
 * Unit 4, Stickness Activity
 * Modified in Unit 5; Login Process Activity
 * ************************/
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

/* ***********************
 * Unit 5, Account management view
 * ************************/
router.post(
  "/account-management",
  regValidate.loginRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.accountLogin)
)

module.exports = router