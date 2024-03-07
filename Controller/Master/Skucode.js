const skucodeModal = require("../../Modal/Master/Skucode");

class skucode {
  async addskucode(req, res) {
    let { skucode, purchaseprice, purchasedesc } = req.body;
    try {
      let newskucode = new skucodeModal({
        skucode,
        purchaseprice,
        purchasedesc,
      });
      newskucode.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "Skucode Added Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllskucode(req, res) {
    try {
      let skucode = await skucodeModal.find({});
      if (skucode) {
        return res.status(200).json({ allskucode: skucode });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async editskucode(req, res) {
    try {
      let id = req.params.id;
      let { skucode, purchaseprice, purchasedesc } = req.body;
      const findVendor = await skucodeModal.findOne({ _id: id });
      if (!findVendor) {
        return res.status(401).json({ error: "No Vendor Found" });
      }
      findVendor.skucode = skucode || findVendor.skucode;
      findVendor.purchaseprice = purchaseprice || findVendor.purchaseprice;
      findVendor.purchasedesc = purchasedesc || findVendor.purchasedesc;
      let updatedData = await skucodeModal.findOneAndUpdate(
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

  async deleteskucode(req, res) {
    try {
      let vendorId = req.params.id;
      const data = await skucodeModal.findOne({ _id: vendorId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await skucodeModal.deleteOne({ _id: vendorId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }
}

const skucodeController = new skucode();
module.exports = skucodeController;
