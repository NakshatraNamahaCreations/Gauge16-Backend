const mongoose = require("mongoose");
//4
const deliverychallanGroup = new mongoose.Schema({
  deliverychallanGroupName: {
    type: String,
  },
  aliasName: {
    type: String,
  },
  primaryGroup: {
    type: String,
  },
  underGroup: {
    type: String,
  },
});

const deliverychallanGroupModal = mongoose.model(
  "deliverychallangroup",
  deliverychallanGroup
);
module.exports = deliverychallanGroupModal;
