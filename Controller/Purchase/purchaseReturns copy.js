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

  async addsalesorder(req, res) {
    let {
      purchaseReturnDate,
      salesorderNumber,
      salesorderDate,
      purchaseType,
      salesType,
      vendorId,
      vendor,
      purchasePerson,
      itemDetails,
    } = req.body;
    try {
      let newquotation = new purchaseReturnModal({
        purchaseReturnDate,
        salesorderNumber,
        salesorderDate,
        purchaseType,
        salesType,
        vendorId,
        vendor,
        purchasePerson,
        itemDetails,
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

  async addinvoice(req, res) {
    let {
      purchaseReturnDate,
      Invoicenumber,
      Invoicedate,
      purchaseType,
      salesType,
      vendorId,
      vendor,
      purchasePerson,
      itemDetails,

      invoicetype,
    } = req.body;
    try {
      let newquotation = new purchaseReturnModal({
        purchaseReturnDate,
        Invoicenumber,
        Invoicedate,
        purchaseType,
        salesType,
        vendorId,
        vendor,
        purchasePerson,
        itemDetails,

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

  async getAllpurchaseReturn(req, res) {
    try {
      let items = await purchaseReturnModal.find({ salestype: "Quotation" });
      if (items) {
        return res.status(200).json({ AllPurchaseReturn: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAllsalesorder(req, res) {
    try {
      let items = await purchaseReturnModal.find({ salestype: "Sales" });
      if (items) {
        return res.status(200).json({ salesorder: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAllInvoice(req, res) {
    try {
      let items = await purchaseReturnModal.find({ salestype: "Invoice" });
      if (items) {
        return res.status(200).json({ invoiceall: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAnpurchaseReturn(req, res) {
    const id = req.params.id;

    try {
      let items = await purchaseReturnModal.findOne({
        _id: id,
      });

      if (!items) {
        return res.status(404).json({ message: "Purchase Item not found" });
      } else {
        return res.status(200).json({ purchaseItem: items });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getQuotationByNumberAndDate(req, res) {
    const { VchNumber, series } = req.body;
    if (!VchNumber) {
      return res.status(400).json({ message: "VchNumber is required" });
    }
    try {
      let items = await purchaseReturnModal.findOne({
        VchNumber: VchNumber,
        series: series,
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

  async getQuotationsByNumberAndDate(req, res) {
    const { VchNumber, series } = req.query;

    if (VchNumber != undefined) {
      return res.status(200).json({
        VchNumber: VchNumber,
        series: series,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Atleast one parameter must be provided" });
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

  async editpurchaseReturn(req, res) {
    try {
      let id = req.params.id;
      let {
        purchaseReturnDate,
        salesorderNumber,
        salesorderDate,
        purchaseType,
        salesType,
        vendorId,
        vendor,
        purchasePerson,
        // itemDetails,
        // salestype,
      } = req.body;

      const findItem = await purchaseReturnModal.findOne({ _id: id });
      if (!findItem) {
        return res.status(401).json({ error: "No Items Found" });
      }
      findItem.purchaseReturnDate =
        purchaseReturnDate || findItem.purchaseReturnDate;
      findItem.salesorderNumber = salesorderNumber || findItem.salesorderNumber;
      findItem.salesorderDate = salesorderDate || findItem.salesorderDate;
      findItem.purchaseType = purchaseType || findItem.purchaseType;
      findItem.salesType = salesType || findItem.salesType;
      findItem.vendorId = vendorId || findItem.vendorId;
      findItem.vendor = vendor || findItem.vendor;
      findItem.purchasePerson = purchasePerson || findItem.purchasePerson;

      let updatedData = await purchaseReturnModal.findOneAndUpdate(
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
        purchaseReturnDate,
        Invoicenumber,
        Invoicedate,
        purchaseType,
        salesType,
        vendorId,
        vendor,
        purchasePerson,
        itemDetails,
        salestype,
      } = req.body;

      const findItem = await purchaseReturnModal.findOne({ _id: id });
      if (!findItem) {
        return res.status(401).json({ error: "No Items Found" });
      }
      findItem.purchaseReturnDate =
        purchaseReturnDate || findItem.purchaseReturnDate;
      findItem.Invoicenumber = Invoicenumber || findItem.Invoicenumber;
      findItem.Invoicedate = Invoicedate || findItem.Invoicedate;
      findItem.purchaseType = purchaseType || findItem.purchaseType;
      findItem.salesType = salesType || findItem.salesType;
      findItem.vendorId = vendorId || findItem.vendorId;
      findItem.vendor = vendor || findItem.vendor;
      findItem.purchasePerson = purchasePerson || findItem.purchasePerson;
      findItem.salestype = salestype || findItem.salestype;

      let updatedData = await purchaseReturnModal.findOneAndUpdate(
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

  //   async updateSalesorder(req, res) {
  //     const quotationid = req.params.addexcelid;

  //     try {
  //       if (!quotationid || !mongoose.Types.ObjectId.isValid(quotationid)) {
  //         return res.status(400).json({ error: "Invalid quotationid provided" });
  //       }
  //       const {
  //         purchaseReturnDate,
  //         VchNumber,
  //         series,
  //         purchaseType,
  //         salesType,
  //         vendorId,
  //         vendor,
  //         purchasePerson,
  //         additem,
  //         quantity,
  //         rate,
  //         amount,
  //         discount,
  //         itemDetails,
  //         totalamount,
  //       } = req.body;

  //       const outletNameArrayWithIDs = itemDetails.map((individualOutlet) => ({
  //         _id: new ObjectId(),
  //         purchaseReturnDate,
  //         VchNumber,
  //         series,
  //         purchaseType,
  //         salesType,
  //         vendorId,
  //         vendor,
  //         purchasePerson,
  //         additem,
  //         quantity,
  //         rate,
  //         amount,
  //         discount,
  //         itemDetails,
  //         totalamount,
  //         ...individualOutlet,
  //       }));

  //       const updatedRecce = await purchaseReturnModal.findByIdAndUpdate(
  //         quotationid,
  //         { $push: { itemDetails: { $each: outletNameArrayWithIDs } } },
  //         { new: true }
  //       );

  //       if (!updatedRecce) {
  //         return res
  //           .status(404)
  //           .json({ error: `Document with _id ${quotationid} not found` });
  //       }
  //       console.log("updatedRecce", updatedRecce);
  //       return res
  //         .status(200)
  //         .json({ message: "Quotation updated successfully" });
  //     } catch (error) {
  //       console.error("Error:", error);
  //       console.log("Error occurred");
  //       return res.status(500).json({ error: "Internal server error" });
  //     }
  //   }
}

const purchaseReturnController = new purchaseReturn();
module.exports = purchaseReturnController;
