const express = require("express");
const router = express.Router();
const itemsController = require("../../Controller/Master/items");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/item");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/additem", upload.single("itemImage"), itemsController.addItems);
router.get("/getallitems", itemsController.getAllItems);
router.get("/getanitem/:id", itemsController.getAnItem);
router.put(
  "/edititem/:id",
  upload.single("itemImage"),
  itemsController.editItems
);
router.delete("/deleteitem/:id", itemsController.deleteItem);

module.exports = router;
