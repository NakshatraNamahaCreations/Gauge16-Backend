const mongoose = require("mongoose");
//4
const deliverychallan = new mongoose.Schema({
  customername: {
    type: Array,
  },
  deliverychallanNumber: {
    type: String,
  },
  deliverychallanDate: {
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

const deliverychallanModal = mongoose.model("deliverychallan", deliverychallan);
module.exports = deliverychallanModal;
