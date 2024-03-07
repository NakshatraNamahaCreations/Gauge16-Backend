const express = require("express");
const router = express.Router("");
const salesorderController = require("../../Controller/Transaction/Salesorder");

// Quotation
router.post("/addquotation", salesorderController.addquotation);
router.post(
  "/filterquotation",
  salesorderController.getQuotationByNumberAndDate
);
router.post(
  "/searchsalesordernumber",
  salesorderController.searchSalesOrderNumber
);
router.get("/getallquotation", salesorderController.getAllquotation);

// Sales Order
router.post("/addsalesorder", salesorderController.addSalesOrder);
router.get("/getallsalesorder", salesorderController.getAllsalesorder);

router.put("/editSalesorder/:id", salesorderController.editSalesorder);

router.delete("/deletesalesorder/:id", salesorderController.deletesalesorder);

// Invoice
router.post("/addinvoice", salesorderController.addinvoice);
router.get("/getallinvoice", salesorderController.getAllInvoice);
router.put("/editinvoice/:id", salesorderController.editInvoice);

module.exports = router;
