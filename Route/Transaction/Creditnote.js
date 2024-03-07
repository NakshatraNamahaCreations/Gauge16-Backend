const express = require("express");
const router = express.Router();
const creditnoteController = require("../../Controller/Transaction/Creditnote");

router.post("/addcreditnote", creditnoteController.addcreditnote);
router.get("/getAllcreditnote", creditnoteController.getAllcreditnote);

router.delete("/deletecreditnote/:id", creditnoteController.deletecreditnote);
router.put("/editCreditnote/:id", creditnoteController.editCreditnote);

module.exports = router;
