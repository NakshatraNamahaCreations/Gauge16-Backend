const express = require("express");
const router = express.Router();
const vendorController = require("../../Controller/Master/vendors");

router.post("/addvendor", vendorController.addVendor);
router.get("/getallvendor", vendorController.getAllVendor);
router.get("/getanvendor/:id", vendorController.getAnVendor);
router.put("/editvendor/:id", vendorController.editVendor);
router.delete("/deletevendor/:id", vendorController.deleteVendor);

module.exports = router;
