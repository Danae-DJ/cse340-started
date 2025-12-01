// Needed Resources 
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");//management view route
const inventory = require("/inv/getInventory/:classification_id")//Inventory Items route
const edit = require("../controllers/invController"); //Edit inventory items
const update = require("../controllers/invController")//pdate view: inventory route 

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:invId", invController.buildByInvId);

//Management View Route 
router.get("/", invController.buildManagementView);

//Add Classification view
router.get("/add-classification", invController.buildAddClassificationView);

//Add Inventory view
router.get("/add-inventory", invController.buildAddInventoryView);

//Inventory Items route
router.get("/getInventory/:classification_id", invController.getInventoryJSON);

//Edit inventory items
router.get("/edit-inventory", invController.editInventoryView);

//Update view: inventory route
router.post("/update/", invController.updateInventory)

module.exports = router;