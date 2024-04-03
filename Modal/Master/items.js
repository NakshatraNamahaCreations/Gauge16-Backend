const mongoose = require("mongoose");
// 29
const items = new mongoose.Schema({
  itemName: {
    type: String,
  },
  itemImage: {
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
  skuCode: {
    type: String,
  },
  skuCodeId: {
    type: String,
  },
  skuManufacturerCode: {
    type: String,
  },
  description: {
    type: String,
  },
  tax: {
    type: String,
  },
  taxType: {
    type: String,
  },
  unitRequired: {
    type: String,
  },
  unitFrom: {
    type: String,
  },
  unitTo: {
    type: String,
  },
  //   Sales Information
  sellingPrice: {
    type: Number,
  },
  salesDescription: {
    type: String,
  },
  //   More Fields
  hsnCode: {
    type: String,
  },
  manufacturersCode: {
    type: String,
  },
  brand: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  weight: {
    type: String,
  },
  dimensionsLength: {
    type: String,
  },
  dimensionsWidth: {
    type: String,
  },
  dimensionsHeight: {
    type: String,
  },
  //   purchase information
  purchasePrice: {
    type: String,
  },
  purchaseDescription: {
    type: String,
  },
  //   track inventory for this item
  itemGroupCategory: {
    type: String,
  },
  openingStock: {
    type: Number,
  },
  stockInHand: {
    type: Number,
  },
  oldstockinhand: {
    type: Number,
  },
  openingStockRatePerUnit: {
    type: String,
  },
  reOrderLevel: {
    type: String,
  },
  preferredVendor: {
    type: String,
  },
  discount: {
    type: Number,
  },
  quantity: {
    type: String,
  },
});

const itemsModal = mongoose.model("items", items);
module.exports = itemsModal;


