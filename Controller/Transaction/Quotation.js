const quotationModal = require("../../Modal/Transaction/Quotation");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class items {
  async addquotation(req, res) {
    let {
      customername,
      QuotationNumber,
      QuotationDate,
      PaymentTerms,
      Address,
      PhoneNumber,
      DeliveryMethod,
      SalesPerson,
      //   additem,
      //   quantity,
      //   rate,
      //   amount,
      //   discount,
      itemDetails,
      //   totalamount,
    } = req.body;
    try {
      let newquotation = new quotationModal({
        customername,
        QuotationNumber,
        QuotationDate,
        PaymentTerms,
        Address,
        PhoneNumber,
        DeliveryMethod,
        SalesPerson,
        // additem,
        // quantity,
        // rate,
        // amount,
        // discount,
        itemDetails,
        // totalamount,
      });
      newquotation.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "Quotation Added Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllquotation(req, res) {
    try {
      let items = await quotationModal.find({});
      if (items) {
        return res.status(200).json({ allItems: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deletequotation(req, res) {
    try {
      let itemId = req.params.id;
      const data = await quotationModal.findOne({ _id: itemId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await quotationModal.deleteOne({ _id: itemId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }

  async updateRecceOutletName(req, res) {
    const quotationid = req.params.addexcelid;

    try {
      if (!quotationid || !mongoose.Types.ObjectId.isValid(quotationid)) {
        return res.status(400).json({ error: "Invalid quotationid provided" });
      }
      const {
        customername,
        QuotationNumber,
        QuotationDate,
        PaymentTerms,
        Address,
        PhoneNumber,
        DeliveryMethod,
        SalesPerson,
        additem,
        quantity,
        rate,
        amount,
        discount,
        itemDetails,
        totalamount,
      } = req.body;

      const outletNameArrayWithIDs = itemDetails.map((individualOutlet) => ({
        _id: new ObjectId(),
        customername,
        QuotationNumber,
        QuotationDate,
        PaymentTerms,
        Address,
        PhoneNumber,
        DeliveryMethod,
        SalesPerson,
        additem,
        quantity,
        rate,
        amount,
        discount,
        itemDetails,
        totalamount,
        ...individualOutlet,
      }));

      const updatedRecce = await quotationModal.findByIdAndUpdate(
        quotationid,
        { $push: { itemDetails: { $each: outletNameArrayWithIDs } } },
        { new: true }
      );

      if (!updatedRecce) {
        return res
          .status(404)
          .json({ error: `Document with _id ${quotationid} not found` });
      }
      console.log("updatedRecce", updatedRecce);
      return res
        .status(200)
        .json({ message: "Quotation updated successfully" });
    } catch (error) {
      console.error("Error:", error);
      console.log("Error occurred");
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

const quotationController = new items();
module.exports = quotationController;
