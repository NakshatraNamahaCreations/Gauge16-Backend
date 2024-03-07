const express = require("express");
const router = express.Router();
const itemGroupsController = require("../../Controller/Master/itemGroups");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/item_groups");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/additemgroups",
  upload.single("itemsGroupImage"),
  itemGroupsController.addItemGroups
);
router.get("/getallitemgroups", itemGroupsController.getAllItemGroups);
router.get("/getanitemgroups/:id", itemGroupsController.getAnItemGroup);
router.put(
  "/edititemgroups/:id",
  upload.single("itemsGroupImage"),
  itemGroupsController.editItemGroups
);
router.delete("/deleteitemgroups/:id", itemGroupsController.deleteItemGroups);
router.put("/itemgroupstatus/:id", itemGroupsController.itemGroupStatus);

module.exports = router;
