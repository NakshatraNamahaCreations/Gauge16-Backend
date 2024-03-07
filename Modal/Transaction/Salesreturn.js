const mongoose = require("mongoose");
//4
const salesreturn = new mongoose.Schema({
  customername: {
    type: String,
  },
  salesreturnNumber: {
    type: Number,
  },
  salesreturnDate: {
    type: String,
  },
  vchno: {
    type: String,
  },
  challantype: {
    type: String,
  },
  salestype: {
    type: String,
  },

  itemDetails: {
    type: Array,
  },
  series: {
    type: String,
  },
});

const salesreturnModal = mongoose.model("salesreturn", salesreturn);
module.exports = salesreturnModal;
