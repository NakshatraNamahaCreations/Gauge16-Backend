const express = require("express");
const router = express.Router();
const purchaseinvoiceController = require("../../Controller/Purchase/Purchaseinvoice");

router.post(
  "/addpurchaseinvoice",
  purchaseinvoiceController.addpurchaseinvoice
);
router.get(
  "/getAllpurchaseinvoice",
  purchaseinvoiceController.getAllpurchaseinvoice
);
router.delete(
  "/deletepurchaseinvoice/:id",
  purchaseinvoiceController.deletepurchaseinvoice
);
router.put(
  "/editpurchaseinvoice/:id",
  purchaseinvoiceController.editpurchaseinvoice
);

module.exports = router;
