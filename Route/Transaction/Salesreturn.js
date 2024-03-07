const express = require("express");
const router = express.Router();
const salesreturnController = require("../../Controller/Transaction/Salesreturn");

router.post("/addsalesreturn", salesreturnController.addsalesreturn);
router.get("/getAllsalesreturn", salesreturnController.getAllsalesreturn);
router.delete(
  "/deletesalesreturn/:id",
  salesreturnController.deletesalesreturn
);

module.exports = router;
