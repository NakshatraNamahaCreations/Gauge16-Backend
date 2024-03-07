const debitnoteModal = require("../../Modal/Purchase/Debitnote");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class debitnote {
  async adddebitnote(req, res) {
    let { vendorname, debitnoteNumber, debitnoteDate, itemDetails } = req.body;
    try {
      let newcreditnote = new debitnoteModal({
        vendorname,
        debitnoteNumber,
        debitnoteDate,
        itemDetails,
      });
      newcreditnote.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "Credit Note Added Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAlldebitnote(req, res) {
    try {
      let items = await debitnoteModal.find({});
      if (items) {
        return res.status(200).json({ allcreditnote: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async editdebitnote(req, res) {
    try {
      let id = req.params.id;
      let { vendorname, debitnoteNumber, debitnoteDate, itemDetails } =
        req.body;

      const findItem = await returnsaleModal.findOne({ _id: id });
      if (!findItem) {
        return res.status(401).json({ error: "No Items Found" });
      }
      findItem.vendorname = vendorname || findItem.vendorname;
      findItem.debitnoteNumber = debitnoteNumber || findItem.debitnoteNumber;
      findItem.debitnoteDate = debitnoteDate || findItem.debitnoteDate;

      findItem.itemDetails = itemDetails || findItem.itemDetails;

      let updatedData = await debitnoteModal.findOneAndUpdate(
        { _id: id },
        findItem,
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

  async deletedebitnote(req, res) {
    try {
      let itemId = req.params.id;
      const data = await debitnoteModal.findOne({ _id: itemId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await debitnoteModal.deleteOne({ _id: itemId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }
}

const debitnoteController = new debitnote();
module.exports = debitnoteController;
