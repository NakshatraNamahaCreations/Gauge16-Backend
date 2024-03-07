const purchaseReturnModal = require("../../Modal/Purchase/purchaseReturns");

class purchaseReturn {
  async addPurchaseReturn(req, res) {
    let {
      purchaseReturnDate,
      VchNumber,
      series,
      purchaseType,
      salesType,
      vendorId,
      vendorName,
      purchasePerson,
      itemDetails,
    } = req.body;
    try {
      let newquotation = new purchaseReturnModal({
        purchaseReturnDate,
        VchNumber,
        series,
        purchaseType,
        salesType,
        vendorId,
        vendorName,
        purchasePerson,
        itemDetails,
      });
      newquotation.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "Purchase returned Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllpurchaseReturn(req, res) {
    try {
      let items = await purchaseReturnModal.find({});
      if (items) {
        return res.status(200).json({ AllPurchaseReturn: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deletePurchaseReturn(req, res) {
    try {
      let itemId = req.params.id;
      const data = await purchaseReturnModal.findOne({ _id: itemId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await purchaseReturnModal.deleteOne({ _id: itemId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }
}

const purchaseReturnController = new purchaseReturn();
module.exports = purchaseReturnController;
