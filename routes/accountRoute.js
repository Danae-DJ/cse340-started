/* ***********************
 * Account routes
 * Unit 4, delever login view activity
 * ************************/
//Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities")


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

module.exports = router