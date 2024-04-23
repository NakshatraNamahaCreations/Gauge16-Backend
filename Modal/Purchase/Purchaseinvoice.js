const mongoose = require("mongoose");
//4
const purchaseinvoice = new mongoose.Schema({
  vendorname: {
    type: Array,
  },
  Invoicenumber: {
    type: String,
  },
  Invoicedate: {
    type: String,
  },
  PaymentTerms: {
    type: String,
  },
  Address: {
    type: String,
  },
  DeliveryMethod: {
    type: String,
  },
  SalesPerson: {
    type: String,
  },
  itemDetails: {
    type: Array,
  },
});

const purchaseinvoicemodel = mongoose.model("purchaseinvoice", purchaseinvoice);
module.exports = purchaseinvoicemodel;
