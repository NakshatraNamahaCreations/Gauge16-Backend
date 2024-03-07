const mongoose = require("mongoose");
//4
const salesorder = new mongoose.Schema({
  customername: {
    type: String,
  },
  salesorderNumber: {
    type: Number,
  },
  salesorderDate: {
    type: String,
  },
  PaymentTerms: {
    type: String,
  },
  Address: {
    type: String,
  },
  PhoneNumber: {
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
  //   salesorderStatus: {
  //     type: String,
  //   },
  QuotationNumber: {
    type: Number,
  },
  QuotationDate: {
    type: String,
  },

  salestype: {
    type: String,
  },
  Invoicenumber: {
    type: String,
  },
  Invoicedate: {
    type: String,
  },
  invoicetype: {
    type: String,
  },
  // 26-02-2024
  contactPersonMobileNumber: {
    type: String,
  },
});

const salesorderModal = mongoose.model("salesorder", salesorder);
module.exports = salesorderModal;
