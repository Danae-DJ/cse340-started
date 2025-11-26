// Needed Resources 
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");//management view route

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:invId", invController.buildByInvId);

//Management View Route 
router.get("/", invController.buildManagementView);

//Add Classification view
router.get("/add-classification", invController.buildAddClassificationView);

//Add Inventory view
router.get("/add-vehicle", invController.buildAddInventoryView);

module.exports = router;