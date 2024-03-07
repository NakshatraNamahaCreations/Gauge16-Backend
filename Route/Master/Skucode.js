const express = require("express");
const router = express.Router();
const skucodeController = require("../../Controller/Master/Skucode");

router.post("/addskucode", skucodeController.addskucode);
router.get("/getAllskucode", skucodeController.getAllskucode);

router.put("/editskucode/:id", skucodeController.editskucode);
router.delete("/deleteskucode/:id", skucodeController.deleteskucode);

module.exports = router;
