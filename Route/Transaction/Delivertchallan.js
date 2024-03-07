const express = require("express");
const router = express.Router();
const deliverychallanController = require("../../Controller/Transaction/Delivertchallan");

router.post("/addchallan", deliverychallanController.addchallan);
router.get("/getAllchallan", deliverychallanController.getAllchallan);

router.delete("/deletechallan/:id", deliverychallanController.deletechallan);

module.exports = router;
