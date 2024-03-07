const express = require("express");
const router = express.Router();
const deliverychallanGroupsController = require("../../Controller/Deliverychallan/Deliverychallangroup");

router.post(
  "/adddeliverychallanGroups",
  deliverychallanGroupsController.adddeliverychallanGroups
);
router.get(
  "/getAlldeliverychallanGroups",
  deliverychallanGroupsController.getAlldeliverychallanGroups
);

router.put(
  "/editAccountGroups/:id",
  deliverychallanGroupsController.editAccountGroups
);
router.delete(
  "/deleteAccountGroups/:id",
  deliverychallanGroupsController.deleteAccountGroups
);
module.exports = router;
