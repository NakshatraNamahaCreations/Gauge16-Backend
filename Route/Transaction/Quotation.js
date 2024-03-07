const express = require("express");
const router = express.Router();
const quotationController = require("../../Controller/Transaction/Quotation");

router.post("/addquotation", quotationController.addquotation);
router.get("/getAllquotation", quotationController.getAllquotation);
router.get(
  "/updateRecceOutletName/:id",
  quotationController.updateRecceOutletName
);
router.delete("/deletequotation/:id", quotationController.deletequotation);

module.exports = router;
