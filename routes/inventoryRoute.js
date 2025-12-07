// Needed Resources 
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");//management view route
const inventoryValidation = require("../utilities/inventory-validation");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:invId", invController.buildByInvId);

//Management View Route 
router.get("/", invController.buildManagementView);

//Add Classification view
router.get(
  "/add-classification",
  utilities.checkAdminEmployee,
  invController.buildAddClassificationView
);

// Process addClassification Route
router.post(
  "/add-classification",
  utilities.checkAdminEmployee,
  inventoryValidation.classificationRule(),
  inventoryValidation.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

//Add Inventory view
router.get(
  "/add-inventory",
  utilities.checkAdminEmployee,
  invController.buildAddInventoryView
);

// Process add-inventory Route
router.post(
  "/add-inventory",
  utilities.checkAdminEmployee,
  inventoryValidation.newInventoryRules(),
  inventoryValidation.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
);

//Inventory Items route
router.get("/getInventory/:classification_id", invController.getInventoryJSON);

//Edit inventory items
router.get(
  "/edit/:inv_id",
  utilities.checkAdminEmployee,
  invController.editInventoryView
);

//Route to Edit inventory items: Update
router.post(
  "/update",
  utilities.checkAdminEmployee,
  invController.updateInventory
);

//Delete inventory items
router.get(
  "/delete/:inv_id",
  utilities.checkAdminEmployee,
  invController.deleteView
);

//Route to Delete inventory items
router.post(
  "/delete",
  utilities.checkAdminEmployee,
  invController.deleteItem
);

module.exports = router;