const express = require("express");
const router = express.Router();
const returnsalesController = require("../../Controller/Purchase/purchaseOrder");

router.post("/adspurchasesales", returnsalesController.adspurchasesales);
router.get("/getAllpurchaseorder", returnsalesController.getAllpurchaseorder);
router.delete(
  "/deletepurchaseorder/:id",
  returnsalesController.deletepurchaseorder
);
router.put("/editpurchaseorder/:id", returnsalesController.editpurchaseorder);

module.exports = router;
