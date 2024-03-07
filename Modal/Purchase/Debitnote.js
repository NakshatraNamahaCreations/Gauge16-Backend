const mongoose = require("mongoose");
//4
const debitnote = new mongoose.Schema({
  vendorname: {
    type: Array,
  },
  debitnoteNumber: {
    type: String,
  },
  debitnoteDate: {
    type: String,
  },
  itemDetails: {
    type: Array,
  },
});

const debitnoteModal = mongoose.model("debitnote", debitnote);
module.exports = debitnoteModal;
