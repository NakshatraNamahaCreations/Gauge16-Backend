const express = require("express");
const router = express.Router();
const accountController = require("../../Controller/Master/accounts");

router.post("/addaccounts", accountController.addAccount);
router.get("/getallaccounts", accountController.getAllAccount);
router.get("/getanaccounts/:id", accountController.getAnAccount);
router.put("/editaccounts/:id", accountController.editAccount);
router.delete("/deleteaccounts/:id", accountController.deleteAccount);
router.put("/createjournals/:id", accountController.createJournals);
router.get("/getaccountbyjournal", accountController.getAccountByJournal);

module.exports = router;
