const express = require("express");
const router = express.Router();
const debitnoteController = require("../../Controller/Purchase/Debitnote");

router.post("/adddebitnote", debitnoteController.adddebitnote);
router.get("/getAlldebitnote", debitnoteController.getAlldebitnote);

router.delete("/deletedebitnote/:id", debitnoteController.deletedebitnote);
router.put("/editdebitnote/:id", debitnoteController.editdebitnote);

module.exports = router;
