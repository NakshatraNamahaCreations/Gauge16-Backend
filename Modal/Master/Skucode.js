const mongoose = require("mongoose");
// 29
const skucode = new mongoose.Schema({
  skucode: {
    type: String,
  },
  purchaseprice: {
    type: String,
  },
  purchasedesc: {
    type: String,
  },
});

const skucodeModal = mongoose.model("skucode", skucode);
module.exports = skucodeModal;
