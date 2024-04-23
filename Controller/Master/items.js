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

  async purchaseaddItems(req, res) {
    let {
      itemName,
      aliasName,
      primaryGroup,
      underGroup,
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
      purchaseresponce,
    } = req.body;
    let file = req.file?.filename;
    try {
      let newItems = new itemsModal({
        itemName,
        itemImage: file,
        aliasName,
        primaryGroup,
        underGroup,
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
        purchaseresponce,
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
