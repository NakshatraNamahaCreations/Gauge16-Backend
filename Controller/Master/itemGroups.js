const itemGroupsModal = require("../../Modal/Master/itemGroups");

class itemGroups {
  async addItemGroups(req, res) {
    let {
      itemGroupName,
      aliasName,
      primaryGroup,
      underGroup,
      description,
      tax,
      hsnCode,
      manufacturersCode,
      itemGroupCategory,
      openingStock,
      openingStockRatePerUnit,
      reOrderLevel,
      itemgroupstatus,
    } = req.body;
    let file = req.file?.filename;
    try {
      let newItems = new itemGroupsModal({
        itemsGroupImage: file,
        itemGroupName,
        aliasName,
        primaryGroup,
        underGroup,
        description,
        tax,
        hsnCode,
        manufacturersCode,
        itemGroupCategory,
        openingStock,
        openingStockRatePerUnit,
        reOrderLevel,
        itemgroupstatus,
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
          .json({ success: "Item Groups Added Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllItemGroups(req, res) {
    try {
      let items = await itemGroupsModal.find({});
      if (items) {
        return res.status(200).json({ allItems: items });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAnItemGroup(req, res) {
    try {
      let itemId = req.params.id;
      let findItem = await itemGroupsModal.findOne({ _id: itemId });
      if (!findItem) {
        return res.status(401).json({ message: "item not found" });
      }
      return res.status(200).json({ item: findItem });
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  async editItemGroups(req, res) {
    try {
      let id = req.params.id;
      let {
        itemGroupName,
        aliasName,
        primaryGroup,
        underGroup,
        description,
        tax,
        hsnCode,
        manufacturersCode,
        itemGroupCategory,
        openingStock,
        openingStockRatePerUnit,
        reOrderLevel,
      } = req.body;
      let file = req.file ? req.file.filename : null;
      const findItem = await itemGroupsModal.findOne({ _id: id });
      if (!findItem) {
        return res.status(401).json({ error: "No Items Found" });
      }
      findItem.itemGroupName = itemGroupName || findItem.itemGroupName;
      findItem.aliasName = aliasName || findItem.aliasName;
      findItem.primaryGroup = primaryGroup || findItem.primaryGroup;
      findItem.underGroup = underGroup || findItem.underGroup;
      findItem.description = description || findItem.description;
      findItem.tax = tax || findItem.tax;
      findItem.hsnCode = hsnCode || findItem.hsnCode;
      findItem.manufacturersCode =
        manufacturersCode || findItem.manufacturersCode;
      findItem.itemGroupCategory =
        itemGroupCategory || findItem.itemGroupCategory;
      findItem.openingStock = openingStock || findItem.openingStock;
      findItem.openingStockRatePerUnit =
        openingStockRatePerUnit || findItem.openingStockRatePerUnit;
      findItem.reOrderLevel = reOrderLevel || findItem.reOrderLevel;
      if (file) findItem.itemsGroupImage = file;

      let updatedData = await itemGroupsModal.findOneAndUpdate(
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

  async deleteItemGroups(req, res) {
    try {
      let itemId = req.params.id;
      const data = await itemGroupsModal.findOne({ _id: itemId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await itemGroupsModal.deleteOne({ _id: itemId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }

  async itemGroupStatus(req, res) {
    try {
      let id = req.params.id;
      let { itemgroupstatus } = req.body;

      const data = await itemGroupsModal.findOne({ _id: id });
      if (!data) {
        return res.status(401).send({ message: "Invalid Id" });
      } else {
        await itemGroupsModal.findOneAndUpdate(
          { _id: id },
          { itemgroupstatus }
        );
        return res.status(200).json({ message: "Updated Success" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  }
}

const itemGroupsController = new itemGroups();
module.exports = itemGroupsController;
