const express = require("express");
const router = express.Router();
const purchaseReturnController = require("../../Controller/Purchase/purchaseReturns");

router.post("/addpurchasereturn", purchaseReturnController.addPurchaseReturn);
router.get("/getpurchasereturn", purchaseReturnController.getAllpurchaseReturn);

module.exports = router;
