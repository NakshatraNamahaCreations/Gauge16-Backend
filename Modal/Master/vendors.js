const mongoose = require("mongoose");
//18
const vendors = new mongoose.Schema({
  vendorNameSaluation: {
    type: String,
  },
  vendorNameFirstName: {
    type: String,
  },
  vendorNameLastName: {
    type: String,
  },
  aliasNameOrCompanyName: {
    type: String,
  },
  paymentTerms: {
    type: String,
  },
  panNumber: {
    type: String,
  },
  gstInNumber: {
    type: String,
  },
  //Address
  Street: {
    type: String,
  },
  City: {
    type: String,
  },
  State: {
    type: String,
  },
  zipCode: {
    type: Number,
  },
  country: {
    type: String,
  },
  landmark: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  // Contact Person Information
  Name: {
    type: String,
  },
  aliasName: {
    type: String,
  },
  email: {
    type: String,
  },
  personPhoneNumber: {
    type: Number,
  },
});

const vendorModal = mongoose.model("vendor", vendors);
module.exports = vendorModal;
