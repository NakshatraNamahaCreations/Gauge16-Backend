const salesreturnModal = require("../../Modal/Transaction/Salesreturn");
const itemsModal = require("../../Modal/Master/items");
class Returnsales {
  // async addsalesreturn(req, res) {
  //   let {
  //     customername,
  //     salesreturnNumber,
  //     salesreturnDate,
  //     vchno,
  //     challantype,
  //     salestype,
  //     itemDetails,
  //     series,
  //   } = req.body;
  //   try {
  //     let newquotation = new salesreturnModal({
  //       customername,
  //       salesreturnNumber,
  //       salesreturnDate,
  //       vchno,
  //       challantype,
  //       salestype,
  //       itemDetails,
  //       series,
  //     });
  //     newquotation.save().then((data) => {
  //       console.log(data);
  //       return res
  //         .status(200)
  //         .json({ success: "Sales Return Added Successfully", data });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async addsalesreturn(req, res) {
    try {
      const {
        customername,
        salesreturnNumber,
        salesreturnDate,
        vchno,
        challantype,
        salestype,
        itemDetails,
        series,
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
        const newQuotation = new salesreturnModal({
          customername,
          salesreturnNumber,
          salesreturnDate,
          vchno,
          challantype,
          salestype,
          itemDetails,
          series,
        });
        const savedSalesOrder = await newQuotation.save();
        return res.status(200).json({
          success: "Sales return added successfully",
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

  async getAllsalesreturn(req, res) {
    try {
      let items = await salesreturnModal.find({});
      if (items) {
        return res.status(200).json({ allchallan: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deletesalesreturn(req, res) {
    try {
      let itemId = req.params.id;
      const data = await salesreturnModal.findOne({ _id: itemId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await salesreturnModal.deleteOne({ _id: itemId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }
}

const salesreturnController = new Returnsales();
module.exports = salesreturnController;
