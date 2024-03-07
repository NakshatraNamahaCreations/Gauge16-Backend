const mongoose = require("mongoose");
//18
const customers = new mongoose.Schema({
  customerNameSaluation: {
    type: String,
  },
  customerNameFirstName: {
    type: String,
  },
  customerNameLastName: {
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
  //   address
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
  //   Contact Person Information
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

const customerModal = mongoose.model("customer", customers);
module.exports = customerModal;
