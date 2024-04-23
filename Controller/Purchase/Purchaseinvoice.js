const purchaseinvoicemodel = require("../../Modal/Purchase/Purchaseinvoice");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const itemsModal = require("../../Modal/Master/items");
class purchaseinvoice {
  async addpurchaseinvoice(req, res) {
    try {
      const {
        vendorname,
        Invoicenumber,
        Invoicedate,
        PaymentTerms,
        Address,
        DeliveryMethod,
        SalesPerson,
        itemDetails,
      } = req.body;
      if (!Array.isArray(itemDetails) || itemDetails.length === 0) {
        return res.status(400).json({ error: "Invalid itemDetails array" });
      }
      for (const item of itemDetails) {
        if (!item.itemId) {
          console.error("Invalid item details:", item);
          return res.status(400).json({ error: "Invalid item details" });
        }
      }

      const updateOperations = itemDetails.map((item) => ({
        updateOne: {
          filter: { _id: item.itemId },
          update: {
            $set: { purchaseresponce: true, stockInHand: item.stockInHand },
          },
        },
      }));
      const updateStockInHand = await itemsModal.bulkWrite(updateOperations);
      if (updateStockInHand.modifiedCount === itemDetails.length) {
        const newQuotation = new purchaseinvoicemodel({
          vendorname,
          Invoicenumber,
          Invoicedate,
          PaymentTerms,
          Address,
          DeliveryMethod,
          SalesPerson,
          itemDetails,
        });

        const savedSalesOrder = await newQuotation.save();

        return res.status(200).json({
          success: "purchase order added successfully",
          savedSalesOrder,
          updateStockInHand,
        });
      } else {
        return res.status(500).json({
          error: "Failed to update items status in items schema",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  async getAllpurchaseinvoice(req, res) {
    try {
      let items = await purchaseinvoicemodel.find({});
      if (items) {
        return res.status(200).json({ purchaseinvoice: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deletepurchaseinvoice(req, res) {
    try {
      let itemId = req.params.id;
      const data = await purchaseinvoicemodel.findOne({ _id: itemId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await purchaseinvoicemodel.deleteOne({ _id: itemId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }

  async editpurchaseinvoice(req, res) {
    try {
      let id = req.params.id;
      let {
        vendorname,
        Invoicenumber,
        Invoicedate,
        PaymentTerms,
        Address,
        DeliveryMethod,
        SalesPerson,
        itemDetails,
      } = req.body;

      const findItem = await purchaseinvoicemodel.findOne({ _id: id });
      if (!findItem) {
        return res.status(401).json({ error: "No Items Found" });
      }
      findItem.vendorname = vendorname || findItem.vendorname;
      findItem.Invoicenumber = Invoicenumber || findItem.Invoicenumber;
      findItem.Invoicedate = Invoicedate || findItem.Invoicedate;
      findItem.PaymentTerms = PaymentTerms || findItem.PaymentTerms;
      findItem.Address = Address || findItem.Address;
      findItem.DeliveryMethod = DeliveryMethod || findItem.DeliveryMethod;
      findItem.SalesPerson = SalesPerson || findItem.SalesPerson;
      findItem.itemDetails = itemDetails || findItem.itemDetails;

      let updatedData = await purchaseinvoicemodel.findOneAndUpdate(
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

const purchaseinvoiceController = new purchaseinvoice();
module.exports = purchaseinvoiceController;
