const mongoose = require("mongoose");
//4
const purchaseReturn = new mongoose.Schema({
  purchaseReturnDate: {
    type: String,
  },
  VchNumber: {
    type: String,
  },
  series: {
    type: String,
  },
  purchaseType: {
    type: String,
  },
  salesType: {
    type: String,
  },
  vendorId: {
    type: String,
  },
  vendorName: {
    type: String,
  },
  purchasePerson: {
    type: String,
  },
  itemDetails: {
    type: Array,
  },
});

const purchaseReturnModal = mongoose.model("purchaseReturn", purchaseReturn);
module.exports = purchaseReturnModal;
