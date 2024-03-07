const vendorModal = require("../../Modal/Master/vendors");

class Vendor {
  async addVendor(req, res) {
    let {
      vendorNameSaluation,
      vendorNameFirstName,
      vendorNameLastName,
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
      let newVendor = new vendorModal({
        vendorNameSaluation,
        vendorNameFirstName,
        vendorNameLastName,
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
      newVendor.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "Vendor Added Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllVendor(req, res) {
    try {
      let vendor = await vendorModal.find({});
      if (vendor) {
        return res.status(200).json({ allVendors: vendor });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAnVendor(req, res) {
    try {
      let vendorId = req.params.id;
      let findVendor = await vendorModal.findOne({ _id: vendorId });
      if (!findVendor) {
        return res.status(401).json({ message: "Vendor not found" });
      }
      return res.status(200).json({ Vendor: findVendor });
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  async editVendor(req, res) {
    try {
      let id = req.params.id;
      let {
        vendorNameSaluation,
        vendorNameFirstName,
        vendorNameLastName,
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
      const findVendor = await vendorModal.findOne({ _id: id });
      if (!findVendor) {
        return res.status(401).json({ error: "No Vendor Found" });
      }
      findVendor.vendorNameSaluation =
        vendorNameSaluation || findVendor.vendorNameSaluation;
      findVendor.vendorNameFirstName =
        vendorNameFirstName || findVendor.vendorNameFirstName;
      findVendor.vendorNameLastName =
        vendorNameLastName || findVendor.vendorNameLastName;
      findVendor.aliasNameOrCompanyName =
        aliasNameOrCompanyName || findVendor.aliasNameOrCompanyName;
      findVendor.paymentTerms = paymentTerms || findVendor.paymentTerms;
      findVendor.panNumber = panNumber || findVendor.panNumber;
      findVendor.gstInNumber = gstInNumber || findVendor.gstInNumber;
      findVendor.Street = Street || findVendor.Street;
      findVendor.City = City || findVendor.City;
      findVendor.State = State || findVendor.State;
      findVendor.zipCode = zipCode || findVendor.zipCode;
      findVendor.country = country || findVendor.country;
      findVendor.landmark = landmark || findVendor.landmark;
      findVendor.phoneNumber = phoneNumber || findVendor.phoneNumber;
      findVendor.Name = Name || findVendor.Name;
      findVendor.aliasName = aliasName || findVendor.aliasName;
      findVendor.email = email || findVendor.email;
      findVendor.personPhoneNumber =
        personPhoneNumber || findVendor.personPhoneNumber;

      let updatedData = await vendorModal.findOneAndUpdate(
        { _id: id },
        findVendor,
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

  async deleteVendor(req, res) {
    try {
      let vendorId = req.params.id;
      const data = await vendorModal.findOne({ _id: vendorId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await vendorModal.deleteOne({ _id: vendorId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }
}

const vendorController = new Vendor();
module.exports = vendorController;
