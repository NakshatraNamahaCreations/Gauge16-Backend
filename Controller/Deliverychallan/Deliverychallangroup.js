const deliverychallanGroupModal = require("../../Modal/Deliverychallan/Deliverychallangroup");

class deliverychallanGroups {
  async adddeliverychallanGroups(req, res) {
    let { deliverychallanGroupName, aliasName, primaryGroup, underGroup } =
      req.body;
    try {
      let newAccount = new deliverychallanGroupModal({
        deliverychallanGroupName,
        aliasName,
        primaryGroup,
        underGroup,
      });
      newAccount.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "delivery challan Added Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAlldeliverychallanGroups(req, res) {
    try {
      let account = await deliverychallanGroupModal.find({});
      if (account) {
        return res.status(200).json({ alldeliverychallangroup: account });
      }
    } catch (err) {
      console.log(err);
    }
  }

  //   async getAnAccountGroup(req, res) {
  //     try {
  //       let id = req.params.id;
  //       let findAccount = await deliverychallanGroupModal.findOne({ _id: id });
  //       if (!findAccount) {
  //         return res.status(401).json({ message: "account groups not found" });
  //       }
  //       return res.status(200).json({ account: findAccount });
  //     } catch (error) {
  //       console.log("Error : ", error);
  //     }
  //   }

  async editAccountGroups(req, res) {
    try {
      let id = req.params.id;
      let { deliverychallanGroupName, aliasName, primaryGroup, underGroup } =
        req.body;
      const findAccountGroups = await deliverychallanGroupModal.findOne({
        _id: id,
      });
      if (!findAccountGroups) {
        return res.status(401).json({ error: "No account groups Found" });
      }
      findAccountGroups.deliverychallanGroupName =
        deliverychallanGroupName || findAccountGroups.deliverychallanGroupName;
      findAccountGroups.aliasName = aliasName || findAccountGroups.aliasName;
      findAccountGroups.primaryGroup =
        primaryGroup || findAccountGroups.primaryGroup;
      findAccountGroups.underGroup = underGroup || findAccountGroups.underGroup;

      let updatedData = await deliverychallanGroupModal.findOneAndUpdate(
        { _id: id },
        findAccountGroups,
        { new: true }
      );
      console.log("updatedData", updatedData);
      if (updatedData) {
        return res
          .status(200)
          .json({ message: "Updated successfully", data: updatedData });
      } else {
        return res.status(500).json({ status: false, msg: "Failed to update" });
      }
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ error: "Unable to update the details! Try again later" });
    }
  }

  async deleteAccountGroups(req, res) {
    try {
      let accountId = req.params.id;
      const data = await deliverychallanGroupModal.findOne({ _id: accountId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await deliverychallanGroupModal.deleteOne({ _id: accountId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }

  //   async accountGroupStatus(req, res) {
  //     try {
  //       let accountId = req.params.id;
  //       let { accountGroupStatus } = req.body;
  //       const findAccount = await deliverychallanGroupModal.findOne({ _id: accountId });
  //       if (!findAccount) {
  //         return res
  //           .status(404)
  //           .json({ message: "No Account group Found with this ID" });
  //       } else {
  //         await deliverychallanGroupModal.findOneAndUpdate(
  //           { _id: accountId },
  //           { accountGroupStatus }
  //         );
  //         return res.status(200).json({ message: "status updated" });
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       return res.status(500).json({ Error: "Server Error!" });
  //     }
  //   }
}

const deliverychallanGroupsController = new deliverychallanGroups();
module.exports = deliverychallanGroupsController;
