const mongoose = require("mongoose");
//22
const accounts = new mongoose.Schema({
  accountName: {
    type: String,
  },
  aliasName: {
    type: String,
  },
  parentGroup: {
    type: String,
  },
  opBal: {
    type: String,
  },
  prevYearBal: {
    type: String,
  },
  address: {
    type: String,
  },
  gstInNo: {
    type: String,
  },
  aadharNo: {
    type: String,
  },
  panNo: {
    type: String,
  },
  email: {
    type: String,
  },
  mobileNo: {
    type: Number,
  },
  faxNo: {
    type: String,
  },
  cstNo: {
    type: String,
  },
  bankName: {
    type: String,
  },
  ifscCode: {
    type: String,
  },
  telephoneNo: {
    type: Number,
  },
  contactPerson: {
    type: String,
  },
  station: {
    type: String,
  },
  distance: {
    type: String,
  },
  Transport: {
    type: String,
  },
  lstNo: {
    type: String,
  },
  bankAcNo: {
    type: String,
  },
  // 09-03-2024
  creditAmount: {
    type: Number,
  },
  debitAmount: {
    type: Number,
  },
  journalDescription: {
    type: String,
  },
  journal: {
    type: String,
  },
  journalCreatedDate: {
    type: Date,
  },
});

const accountModal = mongoose.model("account", accounts);
module.exports = accountModal;
