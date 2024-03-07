const mongoose = require("mongoose");
//13
const itemGroup = new mongoose.Schema({
  itemGroupName: {
    type: String,
  },
  itemsGroupImage: {
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
  description: {
    type: String,
  },
  tax: {
    type: String,
  },
  //   More Fields
  hsnCode: {
    type: String,
  },
  manufacturersCode: {
    type: String,
  },
  //   track inventory for this item
  itemGroupCategory: {
    type: String,
  },
  openingStock: {
    type: String,
  },
  openingStockRatePerUnit: {
    type: String,
  },
  reOrderLevel: {
    type: String,
  },
  itemgroupstatus: {
    type: String,
  },
});

const itemGroupModal = mongoose.model("itemGroup", itemGroup);
module.exports = itemGroupModal;
