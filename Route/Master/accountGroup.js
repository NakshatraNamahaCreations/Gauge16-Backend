const express = require("express");
const router = express.Router();
const accountGroupsController = require("../../Controller/Master/accountGroup");

router.post("/addaccountgroups", accountGroupsController.addAccountGroups);
router.get("/getallaccountgroups", accountGroupsController.getAllAccountGroups);
router.get(
  "/getanaccountgroups/:id",
  accountGroupsController.getAnAccountGroup
);
router.put("/editaccountgroups/:id", accountGroupsController.editAccountGroups);
router.delete(
  "/deleteaccountgroups/:id",
  accountGroupsController.deleteAccountGroups
);

module.exports = router;
