const express = require("express");
const router = express.Router();
const customerController = require("../../Controller/Master/customers");

router.post("/addcustomer", customerController.addCustomer);
router.get("/getallcustomer", customerController.getAllCustomer);
router.get("/getancustomer/:id", customerController.getAnCustomer);
router.put("/editcustomer/:id", customerController.editCustomer);
router.delete("/deletecustomer/:id", customerController.deleteCustomer);

module.exports = router;
