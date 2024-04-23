const salesorderModal = require("../../Modal/Transaction/Salesorder");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const itemsModal = require("../../Modal/Master/items");

class salesorder {
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
      itemDetails,
      salestype,
      contactPersonMobileNumber,
    } = req.body;
    try {
      let newquotation = new salesorderModal({
        customername,
        QuotationNumber,
        QuotationDate,
        PaymentTerms,
        Address,
        PhoneNumber,
        DeliveryMethod,
        SalesPerson,
        itemDetails,
        salestype,
        contactPersonMobileNumber,
      });
      newquotation.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "quotation Added Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addSalesOrder(req, res) {
    try {
      const {
        customername,
        salesorderNumber,
        salesorderDate,
        PaymentTerms,
        Address,
        PhoneNumber,
        DeliveryMethod,
        SalesPerson,
        itemDetails,
        salestype,
        contactPersonMobileNumber,
      } = req.body;

      // Update stockInHand in items schema
      // const updateStockInHand = await itemsModal.updateMany(
      //   { _id: { $in: itemDetails.map((item) => item.itemId) } },
      //   {
      //     $set: {
      //       stockInHand: { $each: itemDetails.map((item) => item.stockInHand) },
      //     },
      //   }
      // );
      // Validate itemDetails array
      if (!Array.isArray(itemDetails) || itemDetails.length === 0) {
        return res.status(401).json({ error: "Invalid itemDetails array" });
      }

      // Validate item details within the array
      for (const item of itemDetails) {
        if (!item.itemId || item.stockInHand === undefined) {
          console.error("Invalid item details:", item);
          return res.status(400).json({ error: "Invalid item details" });
        }
      }

      const updateOperations = itemDetails.map((item) => ({
        updateOne: {
          filter: { _id: item.itemId },
          update: { $set: { stockInHand: item.stockInHand } },
        },
      }));

      // Update stockInHand in items schema
      const updateStockInHand = await itemsModal.bulkWrite(updateOperations);

      // Check if stock update was successful
      if (updateStockInHand.modifiedCount === itemDetails.length) {
        // Create a new sales order in the salesOrder schema
        const newQuotation = new salesorderModal({
          customername,
          salesorderNumber,
          salesorderDate,
          PaymentTerms,
          Address,
          PhoneNumber,
          DeliveryMethod,
          SalesPerson,
          itemDetails,
          salestype,
          contactPersonMobileNumber,
        });

        const savedSalesOrder = await newQuotation.save();

        return res.status(200).json({
          success: "Sales order added successfully",
          savedSalesOrder,
          updateStockInHand,
        });
      } else {
        return res.status(500).json({
          error: "Failed to update stockInHand in items schema",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  }

  // correct one old basic
  // async addSalesOrder(req, res) {
  //   let {
  //     customername,
  //     salesorderNumber,
  //     salesorderDate,
  //     PaymentTerms,
  //     Address,
  //     PhoneNumber,
  //     DeliveryMethod,
  //     SalesPerson,
  //     itemDetails,
  //     salestype,
  //     contactPersonMobileNumber,
  //   } = req.body;
  //   try {
  //     let newquotation = new salesorderModal({
  //       customername,
  //       salesorderNumber,
  //       salesorderDate,
  //       PaymentTerms,
  //       Address,
  //       PhoneNumber,
  //       DeliveryMethod,
  //       SalesPerson,
  //       itemDetails,
  //       salestype,
  //       contactPersonMobileNumber,
  //     });
  //     const updateStockInHand = await itemsModal.updateMany(
  //       {
  //         _id: { $in: itemDetails.itemId },
  //       },
  //       { $set: { $in: itemDetails.stockInHand } }
  //     );
  //     newquotation.save().then((data) => {
  //       console.log(data);
  //       return res.status(200).json({
  //         success: "salesorder Added Successfully",
  //         data,
  //         updateStockInHand,
  //       });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async addinvoice(req, res) {
    let {
      customername,
      Invoicenumber,
      Invoicedate,
      PaymentTerms,
      Address,
      PhoneNumber,
      DeliveryMethod,
      SalesPerson,
      itemDetails,
      salestype,
      invoicetype,
    } = req.body;
    try {
      let newquotation = new salesorderModal({
        customername,
        Invoicenumber,
        Invoicedate,
        PaymentTerms,
        Address,
        PhoneNumber,
        DeliveryMethod,
        SalesPerson,
        itemDetails,
        salestype,
        invoicetype,
      });
      newquotation.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "salesorder Added Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllquotation(req, res) {
    try {
      let items = await salesorderModal.find({ salestype: "Quotation" });
      if (items) {
        return res.status(200).json({ quotationall: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAllsalesorder(req, res) {
    try {
      let items = await salesorderModal.find({ salestype: "Sales" });
      if (items) {
        return res.status(200).json({ salesorder: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAllInvoice(req, res) {
    try {
      let items = await salesorderModal.find({ salestype: "Invoice" });
      if (items) {
        return res.status(200).json({ invoiceall: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getQuotationByNumberAndDate(req, res) {
    const { QuotationNumber, QuotationDate } = req.body;
    if (!QuotationNumber) {
      return res.status(400).json({ message: "Quotation Number is required" });
    }
    try {
      let items = await salesorderModal.findOne({
        QuotationNumber: QuotationNumber,
        QuotationDate: QuotationDate,
      });

      if (items) {
        return res.status(200).json({ quotations: items });
      } else {
        return res.status(404).json({ message: "Quotations not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async searchSalesOrderNumber(req, res) {
    const { salesorderNumber, salestype } = req.body;
    console.log(salesorderNumber, "salesorderNumber");
    try {
      let items = await salesorderModal.findOne({
        salesorderNumber,
        salestype,
      });

      if (items) {
        return res.status(200).json({ salesorder: items });
      } else {
        return res
          .status(404)
          .json({ message: "Incorrect Sale Order Number or Type" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getQuotationsByNumberAndDate(req, res) {
    const { QuotationNumber, QuotationDate } = req.query;

    if (QuotationNumber != undefined) {
      return res.status(200).json({
        QuotationNumber: QuotationNumber,
        QuotationDate: QuotationDate,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Atleast one parameter must be provided" });
    }
  }

  async deletesalesorder(req, res) {
    try {
      let itemId = req.params.id;
      const data = await salesorderModal.findOne({ _id: itemId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await salesorderModal.deleteOne({ _id: itemId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }

  async editSalesorder(req, res) {
    try {
      let id = req.params.id;
      let {
        customername,
        salesorderNumber,
        salesorderDate,
        PaymentTerms,
        Address,
        PhoneNumber,
        DeliveryMethod,
        SalesPerson,
        itemDetails,
        salestype,
      } = req.body;

      const findItem = await salesorderModal.findOne({ _id: id });
      if (!findItem) {
        return res.status(401).json({ error: "No Items Found" });
      }
      findItem.customername = customername || findItem.customername;
      findItem.salesorderNumber = salesorderNumber || findItem.salesorderNumber;
      findItem.salesorderDate = salesorderDate || findItem.salesorderDate;
      findItem.PaymentTerms = PaymentTerms || findItem.PaymentTerms;
      findItem.Address = Address || findItem.Address;
      findItem.PhoneNumber = PhoneNumber || findItem.PhoneNumber;
      findItem.DeliveryMethod = DeliveryMethod || findItem.DeliveryMethod;
      findItem.SalesPerson = SalesPerson || findItem.SalesPerson;
      findItem.salestype = salestype || findItem.salestype;

      let updatedData = await salesorderModal.findOneAndUpdate(
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

  async editInvoice(req, res) {
    try {
      let id = req.params.id;
      let {
        customername,
        Invoicenumber,
        Invoicedate,
        PaymentTerms,
        Address,
        PhoneNumber,
        DeliveryMethod,
        SalesPerson,
        itemDetails,
        salestype,
      } = req.body;

      const findItem = await salesorderModal.findOne({ _id: id });
      if (!findItem) {
        return res.status(401).json({ error: "No Items Found" });
      }
      findItem.customername = customername || findItem.customername;
      findItem.Invoicenumber = Invoicenumber || findItem.Invoicenumber;
      findItem.Invoicedate = Invoicedate || findItem.Invoicedate;
      findItem.PaymentTerms = PaymentTerms || findItem.PaymentTerms;
      findItem.Address = Address || findItem.Address;
      findItem.PhoneNumber = PhoneNumber || findItem.PhoneNumber;
      findItem.DeliveryMethod = DeliveryMethod || findItem.DeliveryMethod;
      findItem.SalesPerson = SalesPerson || findItem.SalesPerson;
      findItem.salestype = salestype || findItem.salestype;

      let updatedData = await salesorderModal.findOneAndUpdate(
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

const salesorderController = new salesorder();
module.exports = salesorderController;
