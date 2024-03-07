const deliverychallanModal = require("../../Modal/Transaction/Delivertchallan");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class deliverychallan {
  async addchallan(req, res) {
    let {
      customername,
      deliverychallanNumber,
      deliverychallanDate,
      vchno,
      challantype,
      salestype,
      itemDetails,
      series,
    } = req.body;
    try {
      let newquotation = new deliverychallanModal({
        customername,
        deliverychallanNumber,
        deliverychallanDate,
        vchno,
        challantype,
        salestype,
        itemDetails,
        series,
      });
      newquotation.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "Delivery Challan Added Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllchallan(req, res) {
    try {
      let items = await deliverychallanModal.find({});
      if (items) {
        return res.status(200).json({ allchallan: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deletechallan(req, res) {
    try {
      let itemId = req.params.id;
      const data = await deliverychallanModal.findOne({ _id: itemId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await deliverychallanModal.deleteOne({ _id: itemId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }
}

const deliverychallanController = new deliverychallan();
module.exports = deliverychallanController;
