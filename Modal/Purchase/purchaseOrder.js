const mongoose = require("mongoose");
//4
const purchaseorder = new mongoose.Schema({
  vendorname: {
    type: Array,
  },
  purchaseorderNumber: {
    type: String,
  },
  purchaseorderDate: {
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
  phoneNumber: {
    type: Number,
  },
});

const PurchaseOrdermodel = mongoose.model("purchaseorder", purchaseorder);
module.exports = PurchaseOrdermodel;
