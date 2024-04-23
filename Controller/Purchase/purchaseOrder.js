const PurchaseOrdermodel = require("../../Modal/Purchase/purchaseOrder");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class purchaseorder {
  async adspurchasesales(req, res) {
    let {
      vendorname,
      purchaseorderNumber,
      purchaseorderDate,
      PaymentTerms,
      Address,
      DeliveryMethod,
      SalesPerson,
      itemDetails,
      phoneNumber,
    } = req.body;
    try {
      let newquotation = new PurchaseOrdermodel({
        vendorname,
        purchaseorderNumber,
        purchaseorderDate,
        PaymentTerms,
        Address,
        DeliveryMethod,
        SalesPerson,
        itemDetails,
        phoneNumber,
      });
      newquotation.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "Purchase Order Added Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllpurchaseorder(req, res) {
    try {
      let items = await PurchaseOrdermodel.find({});
      if (items) {
        return res.status(200).json({ purchaseorder: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deletepurchaseorder(req, res) {
    try {
      let itemId = req.params.id;
      const data = await PurchaseOrdermodel.findOne({ _id: itemId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await PurchaseOrdermodel.deleteOne({ _id: itemId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }

  async editpurchaseorder(req, res) {
    try {
      let id = req.params.id;
      let {
        vendorname,
        purchaseorderNumber,
        purchaseorderDate,
        PaymentTerms,
        Address,
        DeliveryMethod,
        SalesPerson,
        itemDetails,
        phoneNumber,
      } = req.body;

      const findItem = await PurchaseOrdermodel.findOne({ _id: id });
      if (!findItem) {
        return res.status(401).json({ error: "No Items Found" });
      }
      findItem.vendorname = vendorname || findItem.vendorname;
      findItem.purchaseorderNumber =
        purchaseorderNumber || findItem.purchaseorderNumber;
      findItem.purchaseorderDate =
        purchaseorderDate || findItem.purchaseorderDate;
      findItem.PaymentTerms = PaymentTerms || findItem.PaymentTerms;
      findItem.Address = Address || findItem.Address;
      findItem.DeliveryMethod = DeliveryMethod || findItem.DeliveryMethod;
      findItem.SalesPerson = SalesPerson || findItem.SalesPerson;
      findItem.itemDetails = itemDetails || findItem.itemDetails;
      findItem.phoneNumber = phoneNumber || findItem.phoneNumber;

      let updatedData = await PurchaseOrdermodel.findOneAndUpdate(
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
}

const purchaseorderController = new purchaseorder();
module.exports = purchaseorderController;
