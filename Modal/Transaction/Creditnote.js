const mongoose = require("mongoose");
//4
const creditnote = new mongoose.Schema({
  customername: {
    type: Array,
  },
  creditnoteNumber: {
    type: String,
  },
  creditnoteDate: {
    type: String,
  },
  itemDetails: {
    type: Array,
  },
});

const creditnoteModal = mongoose.model("creditnote", creditnote);
module.exports = creditnoteModal;
