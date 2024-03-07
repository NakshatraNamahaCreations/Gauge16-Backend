const accountGroupModal = require("../../Modal/Master/accountGroup");

class accountGroups {
  async addAccountGroups(req, res) {
    let { accountGroupName, aliasName, primaryGroup, underGroup } = req.body;
    try {
      let newAccount = new accountGroupModal({
        accountGroupName,
        aliasName,
        primaryGroup,
        underGroup,
      });
      newAccount.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "account Groups Added Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllAccountGroups(req, res) {
    try {
      let account = await accountGroupModal.find({});
      if (account) {
        return res.status(200).json({ allAccount: account });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAnAccountGroup(req, res) {
    try {
      let id = req.params.id;
      let findAccount = await accountGroupModal.findOne({ _id: id });
      if (!findAccount) {
        return res.status(401).json({ message: "account groups not found" });
      }
      return res.status(200).json({ account: findAccount });
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  async editAccountGroups(req, res) {
    try {
      let id = req.params.id;
      let { accountGroupName, aliasName, primaryGroup, underGroup } = req.body;
      const findAccountGroups = await accountGroupModal.findOne({ _id: id });
      if (!findAccountGroups) {
        return res.status(401).json({ error: "No account groups Found" });
      }
      findAccountGroups.accountGroupName =
        accountGroupName || findAccountGroups.accountGroupName;
      findAccountGroups.aliasName = aliasName || findAccountGroups.aliasName;
      findAccountGroups.primaryGroup =
        primaryGroup || findAccountGroups.primaryGroup;
      findAccountGroups.underGroup = underGroup || findAccountGroups.underGroup;

      let updatedData = await accountGroupModal.findOneAndUpdate(
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
      const data = await accountGroupModal.findOne({ _id: accountId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await accountGroupModal.deleteOne({ _id: accountId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }
}

const accountGroupsController = new accountGroups();
module.exports = accountGroupsController;
