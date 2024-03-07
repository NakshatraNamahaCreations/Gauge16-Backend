const customerModal = require("../../Modal/Master/customers");

class Customer {
  async addCustomer(req, res) {
    let {
      customerNameSaluation,
      customerNameFirstName,
      customerNameLastName,
      aliasNameOrCompanyName,
      paymentTerms,
      panNumber,
      gstInNumber,
      Street,
      City,
      State,
      zipCode,
      country,
      landmark,
      phoneNumber,
      Name,
      aliasName,
      email,
      personPhoneNumber,
    } = req.body;
    try {
      let newCustomer = new customerModal({
        customerNameSaluation,
        customerNameFirstName,
        customerNameLastName,
        aliasNameOrCompanyName,
        paymentTerms,
        panNumber,
        gstInNumber,
        Street,
        City,
        State,
        zipCode,
        country,
        landmark,
        phoneNumber,
        Name,
        aliasName,
        email,
        personPhoneNumber,
      });
      newCustomer.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "Customer Added Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCustomer(req, res) {
    try {
      let customer = await customerModal.find({});
      if (customer) {
        return res.status(200).json({ allCustomers: customer });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAnCustomer(req, res) {
    try {
      let customerId = req.params.id;
      let findCustomer = await customerModal.findOne({ _id: customerId });
      if (!findCustomer) {
        return res.status(401).json({ message: "Customer not found" });
      }
      return res.status(200).json({ customer: findCustomer });
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  async editCustomer(req, res) {
    try {
      let id = req.params.id;
      let {
        customerNameSaluation,
        customerNameFirstName,
        customerNameLastName,
        aliasNameOrCompanyName,
        paymentTerms,
        panNumber,
        gstInNumber,
        Street,
        City,
        State,
        zipCode,
        country,
        landmark,
        phoneNumber,
        Name,
        aliasName,
        email,
        personPhoneNumber,
      } = req.body;
      const findCustomer = await customerModal.findOne({ _id: id });
      if (!findCustomer) {
        return res.status(401).json({ error: "No Customer Found" });
      }
      findCustomer.customerNameSaluation =
        customerNameSaluation || findCustomer.customerNameSaluation;
      findCustomer.customerNameFirstName =
        customerNameFirstName || findCustomer.customerNameFirstName;
      findCustomer.customerNameLastName =
        customerNameLastName || findCustomer.customerNameLastName;
      findCustomer.aliasNameOrCompanyName =
        aliasNameOrCompanyName || findCustomer.aliasNameOrCompanyName;
      findCustomer.paymentTerms = paymentTerms || findCustomer.paymentTerms;
      findCustomer.panNumber = panNumber || findCustomer.panNumber;
      findCustomer.gstInNumber = gstInNumber || findCustomer.gstInNumber;
      findCustomer.Street = Street || findCustomer.Street;
      findCustomer.City = City || findCustomer.City;
      findCustomer.State = State || findCustomer.State;
      findCustomer.zipCode = zipCode || findCustomer.zipCode;
      findCustomer.country = country || findCustomer.country;
      findCustomer.landmark = landmark || findCustomer.landmark;
      findCustomer.phoneNumber = phoneNumber || findCustomer.phoneNumber;
      findCustomer.Name = Name || findCustomer.Name;
      findCustomer.aliasName = aliasName || findCustomer.aliasName;
      findCustomer.email = email || findCustomer.email;
      findCustomer.personPhoneNumber =
        personPhoneNumber || findCustomer.personPhoneNumber;

      let updatedData = await customerModal.findOneAndUpdate(
        { _id: id },
        findCustomer,
        { new: true }
      );
      console.log("updatedData", updatedData);
      if (updatedData) {
        return res
          .status(200)
          .json({ message: "Updated successfully", data: updatedData });
      } else {
        return res.status(500).json({ status: false, msg: "Failed to update" });
      }
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ error: "Unable to update the details! Try again later" });
    }
  }

  async deleteCustomer(req, res) {
    try {
      let customerId = req.params.id;
      const data = await customerModal.findOne({ _id: customerId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await customerModal.deleteOne({ _id: customerId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }
}

const customerController = new Customer();
module.exports = customerController;
