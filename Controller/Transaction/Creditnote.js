const creditnoteModal = require("../../Modal/Transaction/Creditnote");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class creditnote {
  async addcreditnote(req, res) {
    let { customername, creditnoteNumber, creditnoteDate, itemDetails } =
      req.body;
    try {
      let newcreditnote = new creditnoteModal({
        customername,
        creditnoteNumber,
        creditnoteDate,
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

  async getAllcreditnote(req, res) {
    try {
      let items = await creditnoteModal.find({});
      if (items) {
        return res.status(200).json({ allcreditnote: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async editCreditnote(req, res) {
    try {
      let id = req.params.id;
      let { customername, creditnoteNumber, creditnoteDate, itemDetails } =
        req.body;

      const findItem = await returnsaleModal.findOne({ _id: id });
      if (!findItem) {
        return res.status(401).json({ error: "No Items Found" });
      }
      findItem.customername = customername || findItem.customername;
      findItem.creditnoteNumber = creditnoteNumber || findItem.creditnoteNumber;
      findItem.creditnoteDate = creditnoteDate || findItem.creditnoteDate;

      findItem.itemDetails = itemDetails || findItem.itemDetails;

      let updatedData = await creditnoteModal.findOneAndUpdate(
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

  async deletecreditnote(req, res) {
    try {
      let itemId = req.params.id;
      const data = await creditnoteModal.findOne({ _id: itemId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await creditnoteModal.deleteOne({ _id: itemId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }
}

const creditnoteController = new creditnote();
module.exports = creditnoteController;
