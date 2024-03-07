const mongoose = require("mongoose");
//4
const quotation = new mongoose.Schema({
  customername: {
    type: String,
  },
  QuotationNumber: {
    type: String,
  },
  QuotationDate: {
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
});

const quotationModal = mongoose.model("quotation", quotation);
module.exports = quotationModal;
