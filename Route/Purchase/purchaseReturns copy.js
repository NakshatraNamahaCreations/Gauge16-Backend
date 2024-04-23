const express = require("express");
const router = express.Router();
const purchaseReturnController = require("../../Controller/Purchase/purchaseReturns");

router.post("/addpurchasereturn", purchaseReturnController.addPurchaseReturn);
router.get("/getpurchasereturn", purchaseReturnController.getAllpurchaseReturn);
router.get(
  "/getanpurchasereturn/:id",
  purchaseReturnController.getAnpurchaseReturn
);
router.put(
  "/editpurchasereturn/:id",
  purchaseReturnController.editpurchaseReturn
);
router.delete(
  "/deletepurchasereturn/:id",
  purchaseReturnController.deletePurchaseReturn
);

module.exports = router;
