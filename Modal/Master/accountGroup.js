const mongoose = require("mongoose");
//4
const accountGroup = new mongoose.Schema({
  accountGroupName: {
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

const accountGroupModal = mongoose.model("accountGroup", accountGroup);
module.exports = accountGroupModal;
