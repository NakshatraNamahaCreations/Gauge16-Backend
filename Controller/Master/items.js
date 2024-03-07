const itemsModal = require("../../Modal/Master/items");

class items {
  async addItems(req, res) {
    let {
      itemName,
      aliasName,
      primaryGroup,
      underGroup,
      skuCodeId,
      skuCode,
      skuManufacturerCode,
      description,
      tax,
      taxType,
      unitRequired,
      unitFrom,
      unitTo,
      sellingPrice,
      salesDescription,
      hsnCode,
      manufacturersCode,
      brand,
      manufacturer,
      weight,
      dimensionsHeight,
      dimensionsWidth,
      dimensionsLength,
      purchasePrice,
      purchaseDescription,
      itemGroupCategory,
      openingStock,
      stockInHand,
      oldstockinhand,
      openingStockRatePerUnit,
      reOrderLevel,
      preferredVendor,
      discount,
      quantity,
    } = req.body;
    let file = req.file?.filename;
    try {
      let newItems = new itemsModal({
        itemName,
        itemImage: file,
        aliasName,
        primaryGroup,
        underGroup,
        skuCodeId,
        skuCode,
        skuManufacturerCode,
        description,
        tax,
        taxType,
        unitRequired,
        unitFrom,
        unitTo,
        sellingPrice,
        salesDescription,
        hsnCode,
        manufacturersCode,
        brand,
        manufacturer,
        weight,
        dimensionsHeight,
        dimensionsWidth,
        dimensionsLength,
        purchasePrice,
        purchaseDescription,
        itemGroupCategory,
        openingStock,
        stockInHand,
        oldstockinhand,
        openingStockRatePerUnit,
        reOrderLevel,
        preferredVendor,
        discount,
        quantity,
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select image",
        });
      }
      newItems.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "Items Added Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllItems(req, res) {
    try {
      let items = await itemsModal.find({});
      if (items) {
        return res.status(200).json({ allItems: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAnItem(req, res) {
    try {
      let itemId = req.params.id;
      let findItem = await itemsModal.findOne({ _id: itemId });
      if (!findItem) {
        return res.status(401).json({ message: "item not found" });
      }
      return res.status(200).json({ item: findItem });
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  async editItems(req, res) {
    try {
      let id = req.params.id;
      let {
        itemName,
        aliasName,
        primaryGroup,
        underGroup,
        skuCode,
        skuManufacturerCode,
        description,
        tax,
        unitRequired,
        unitFrom,
        unitTo,
        sellingPrice,
        salesDescription,
        hsnCode,
        manufacturersCode,
        brand,
        manufacturer,
        weight,
        dimensionsHeight,
        dimensionsWidth,
        dimensionsLength,
        purchasePrice,
        purchaseDescription,
        itemGroupCategory,
        openingStock,
        oldstockinhand,
        openingStockRatePerUnit,
        reOrderLevel,
        preferredVendor,
        discount,
        quantity,
      } = req.body;
      let file = req.file ? req.file.filename : null;
      const findItem = await itemsModal.findOne({ _id: id });
      if (!findItem) {
        return res.status(401).json({ error: "No Items Found" });
      }
      findItem.itemName = itemName || findItem.itemName;
      findItem.aliasName = aliasName || findItem.aliasName;
      findItem.primaryGroup = primaryGroup || findItem.primaryGroup;
      findItem.underGroup = underGroup || findItem.underGroup;
      findItem.skuCode = skuCode || findItem.skuCode;
      findItem.skuManufacturerCode =
        skuManufacturerCode || findItem.skuManufacturerCode;
      findItem.description = description || findItem.description;
      findItem.tax = tax || findItem.tax;
      findItem.unitRequired = unitRequired || findItem.unitRequired;
      findItem.unitFrom = unitFrom || findItem.unitFrom;
      findItem.unitTo = unitTo || findItem.unitTo;
      findItem.sellingPrice = sellingPrice || findItem.sellingPrice;
      findItem.salesDescription = salesDescription || findItem.salesDescription;
      findItem.hsnCode = hsnCode || findItem.hsnCode;
      findItem.manufacturersCode =
        manufacturersCode || findItem.manufacturersCode;
      findItem.brand = brand || findItem.brand;
      findItem.manufacturer = manufacturer || findItem.manufacturer;
      findItem.weight = weight || findItem.weight;
      findItem.quantity = quantity || findItem.quantity;
      findItem.dimensionsHeight = dimensionsHeight || findItem.dimensionsHeight;
      findItem.dimensionsWidth = dimensionsWidth || findItem.dimensionsWidth;
      findItem.dimensionsLength = dimensionsLength || findItem.dimensionsLength;
      findItem.purchasePrice = purchasePrice || findItem.purchasePrice;
      findItem.purchaseDescription =
        purchaseDescription || findItem.purchaseDescription;
      findItem.discount = discount || findItem.discount;
      findItem.itemGroupCategory =
        itemGroupCategory || findItem.itemGroupCategory;
      findItem.openingStock = openingStock || findItem.openingStock;
      findItem.oldstockinhand = oldstockinhand || findItem.oldstockinhand;
      findItem.openingStockRatePerUnit =
        openingStockRatePerUnit || findItem.openingStockRatePerUnit;
      findItem.reOrderLevel = reOrderLevel || findItem.reOrderLevel;
      findItem.preferredVendor = preferredVendor || findItem.preferredVendor;
      if (file) findItem.itemImage = file;

      let updatedData = await itemsModal.findOneAndUpdate(
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

  async deleteItem(req, res) {
    try {
      let itemId = req.params.id;
      const data = await itemsModal.findOne({ _id: itemId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await itemsModal.deleteOne({ _id: itemId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }
}

const itemsController = new items();
module.exports = itemsController;

// async updateRecceOutletName(req, res) {
//   const outletid = req.params.addexcelid;

//   try {
//     if (!outletid || !mongoose.Types.ObjectId.isValid(outletid)) {
//       return res.status(400).json({ error: "Invalid outletid provided" });
//     }

//     const {
//       vendor,
//       unit,
//       height,
//       State,
//       PartnerCode,
//       date,
//       width,
//       ShopName,
//       ClientName,
//       OutletAddress,
//       OutletZone,
//       category,
//       outletName,
//       OutlateFabricationNeed,
//       OutlateFabricationDeliveryType,
//       InstalationGroup,
//       fabricationupload,
//       GSTNumber,
//       Designstatus,
//       printingStatus,
//       OutletContactNumber,
//       fabricationstatus,
//       installationSTatus,
//       RecceStatus,
//       printupload,
//       installationupload,
//       completedDesign,
//       completedRecceId,
//       completedPrinting,
//       completedInstallation,
//       designupload,
//       reccedesign,
//       No_Quantity,
//       SFT,
//       ProductionRate,
//       ProductionCost,
//       transportationcost,
//       InstallationRate,
//       InstallationCost,
//       transportationRate,
//       latitude,
//       longitude,
//       GSB,
//       OutletCity,
//       FLBoard,
//       Inshop,
//       OutletPincode,
//     } = req.body;

//     const outletNameArrayWithIDs = outletName.map((individualOutlet) => ({
//       _id: new ObjectId(),
//       vendor,
//       ShopName,
//       ClientName,
//       unit,
//       State,
//       OutletAddress,
//       OutletCity,
//       PartnerCode,
//       height,
//       OutletZone,
//       date,
//       width,
//       OutletContactNumber,
//       category,
//       OutlateFabricationNeed,
//       OutlateFabricationDeliveryType,
//       InstalationGroup,
//       fabricationupload,
//       GSTNumber,
//       Designstatus: "Pending",
//       printingStatus: "Pending",
//       fabricationstatus: "Pending",
//       installationSTatus: "Pending",
//       RecceStatus: "Pending",
//       printupload,
//       installationupload,
//       completedDesign,
//       completedRecceId,
//       completedPrinting,
//       completedInstallation,
//       designupload,
//       reccedesign,
//       No_Quantity,
//       SFT,
//       ProductionRate,
//       ProductionCost,
//       transportationcost,
//       InstallationRate,
//       InstallationCost,
//       transportationRate,
//       latitude,
//       longitude,
//       FLBoard,
//       GSB,
//       Inshop,
//       OutletPincode,
//       createdAt: new Date(),
//       ...individualOutlet,
//     }));

//     const updatedRecce = await RecceModel.findByIdAndUpdate(
//       outletid,
//       { $push: { outletName: { $each: outletNameArrayWithIDs } } },
//       { new: true }
//     );

//     if (!updatedRecce) {
//       return res
//         .status(404)
//         .json({ error: `Document with _id ${outletid} not found` });
//     }
//     console.log("updatedRecce", updatedRecce);
//     return res
//       .status(200)
//       .json({ message: "Outlet names updated successfully" });
//   } catch (error) {
//     console.error("Error:", error);
//     console.log("Error occurred");
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }

// updaing and adding=======================
// const mongoose = require('mongoose');

// // Assuming you have mongoose models for Items and SaleOrders

// const updateSalesOrderAndItems = async (salesOrderDetails, itemsUpdateDetails) => {
//   const session = await mongoose.startSession();

//   try {
//     await session.withTransaction(async () => {
//       // Update Sales Order Schema
//       const newSaleOrder = await SaleOrder.create(salesOrderDetails);

//       // Update Items Schema
//       for (const itemUpdate of itemsUpdateDetails) {
//         const itemId = itemUpdate.itemId; // Assuming itemId is the reference to Items schema
//         const updatedItem = await Item.findByIdAndUpdate(
//           itemId,
//           { $set: { stockInHand: itemUpdate.newStockInHand } },
//           { new: true }
//         );

//         // Additional logic if needed after updating each item
//       }
//     });

//     // If both updates were successful, commit the transaction
//     await session.commitTransaction();
//   } catch (error) {
//     // If there's an error in either update, rollback the transaction
//     await session.abortTransaction();
//     console.error('Error:', error);
//   } finally {
//     // End the session
//     session.endSession();
//   }
// };

// // Usage example
// const salesOrderDetails = {
//   customerName: 'Customer A',
//   salesOrderNumber: 'SO123',
//   itemDetails: [
//     { itemId: 'itemObjectId1', quantity: 5 },
//     { itemId: 'itemObjectId2', quantity: 3 },
//     // Additional item details
//   ],
// };

// const itemsUpdateDetails = [
//   { itemId: 'itemObjectId1', newStockInHand: 10 },
//   { itemId: 'itemObjectId2', newStockInHand: 15 },
//   // Additional item update details
// ];

// updateSalesOrderAndItems(salesOrderDetails, itemsUpdateDetails);

// saleOrder Schema
// {
// customername:"Kiru",
// salesorderNumber:4,
// itemDetails: [{
//   itemId:"65dee4148d3a0796e816d913",
// itemName:"USeamFs",
// discountAmount:"42806.40",
// quantity:"20",
// stockInHand:230,
// markup:4,
// openingStock:250
// },{
//   itemId:"65dee4148d3a0796e816d914",
// itemName:"Coffee Table",
// discountAmount:"525000.00",
// quantity:"5",
// stockInHand:95,
// markup:4,
// openingStock:100
// }]
// }
// // items Schema
// {
// _id:"65dee35a8d3a0796e816d90d",
// itemName:"Coffee Table",
// stockInHand:100,
// openingStock:100,
// },
// {
//   _id:"65dee4148d3a0796e816d913",
//   itemName:"Useam Fs",
//   stockInHand:250,
// openingStock:250,

// }
