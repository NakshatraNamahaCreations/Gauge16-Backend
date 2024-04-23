const accountModal = require("../../Modal/Master/accounts");

class Account {
  async addAccount(req, res) {
    let {
      accountName,
      aliasName,
      parentGroup,
      opBal,
      prevYearBal,
      address,
      gstInNo,
      aadharNo,
      panNo,
      email,
      mobileNo,
      faxNo,
      cstNo,
      bankName,
      ifscCode,
      telephoneNo,
      contactPerson,
      station,
      distance,
      Transport,
      lstNo,
      bankAcNo,
    } = req.body;
    try {
      let newAccount = new accountModal({
        accountName,
        aliasName,
        parentGroup,
        opBal,
        prevYearBal,
        address,
        gstInNo,
        aadharNo,
        panNo,
        email,
        mobileNo,
        faxNo,
        cstNo,
        bankName,
        ifscCode,
        telephoneNo,
        contactPerson,
        station,
        distance,
        Transport,
        lstNo,
        bankAcNo,
      });
      newAccount.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ success: "Account Created Successfully", data });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllAccount(req, res) {
    try {
      let Account = await accountModal.find({});
      if (Account) {
        return res.status(200).json({ allAccount: Account });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async createJournals(req, res) {
    try {
      let id = req.params.id;
      let { creditAmount, debitAmount, journalDescription, journal } = req.body;
      const findAccount = await accountModal.findOne({ _id: id });
      if (!findAccount) {
        return res.status(401).json({ error: "No Account Found" });
      }
      const updatedAccount = await accountModal.findOneAndUpdate(
        { _id: id },
        {
          creditAmount,
          debitAmount,
          journalDescription,
          journal,
          journalCreatedDate: Date.now(),
        },
        { new: true }
      );

      res.status(200).json(updatedAccount);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Unable to update the details! Try again later" });
    }
  }

  async getAccountByJournal(req, res) {
    try {
      let findJournal = await accountModal.find({ journal: "yes" });
      if (!findJournal) {
        return res.status(401).json({ message: "Journal not found" });
      }
      return res.status(200).json({ Journal: findJournal });
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  async getAnAccount(req, res) {
    try {
      let accountId = req.params.id;
      let findAccount = await accountModal.findOne({ _id: accountId });
      if (!findAccount) {
        return res.status(401).json({ message: "Account not found" });
      }
      return res.status(200).json({ item: findAccount });
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  async editAccount(req, res) {
    try {
      let id = req.params.id;
      let {
        accountName,
        aliasName,
        parentGroup,
        opBal,
        prevYearBal,
        address,
        gstInNo,
        aadharNo,
        panNo,
        email,
        mobileNo,
        faxNo,
        cstNo,
        bankName,
        ifscCode,
        telephoneNo,
        contactPerson,
        station,
        distance,
        Transport,
        lstNo,
        bankAcNo,
      } = req.body;
      const findAccount = await accountModal.findOne({ _id: id });
      if (!findAccount) {
        return res.status(401).json({ error: "No Account Found" });
      }
      findAccount.accountName = accountName || findAccount.accountName;
      findAccount.aliasName = aliasName || findAccount.aliasName;
      findAccount.parentGroup = parentGroup || findAccount.parentGroup;
      findAccount.opBal = opBal || findAccount.opBal;
      findAccount.prevYearBal = prevYearBal || findAccount.prevYearBal;
      findAccount.address = address || findAccount.address;
      findAccount.gstInNo = gstInNo || findAccount.gstInNo;
      findAccount.aadharNo = aadharNo || findAccount.aadharNo;
      findAccount.panNo = panNo || findAccount.panNo;
      findAccount.email = email || findAccount.email;
      findAccount.mobileNo = mobileNo || findAccount.mobileNo;
      findAccount.faxNo = faxNo || findAccount.faxNo;
      findAccount.cstNo = cstNo || findAccount.cstNo;
      findAccount.bankName = bankName || findAccount.bankName;
      findAccount.ifscCode = ifscCode || findAccount.ifscCode;
      findAccount.telephoneNo = telephoneNo || findAccount.telephoneNo;
      findAccount.contactPerson = contactPerson || findAccount.contactPerson;
      findAccount.station = station || findAccount.station;
      findAccount.distance = distance || findAccount.distance;
      findAccount.Transport = Transport || findAccount.Transport;
      findAccount.lstNo = lstNo || findAccount.lstNo;
      findAccount.bankAcNo = bankAcNo || findAccount.bankAcNo;
      let updatedData = await accountModal.findOneAndUpdate(
        { _id: id },
        findAccount,
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

  async deleteAccount(req, res) {
    try {
      let accountId = req.params.id;
      const data = await accountModal.findOne({ _id: accountId });
      if (!data) {
        return res.status(401).send({ auth: false, message: "Invalid token." });
      } else {
        await accountModal.deleteOne({ _id: accountId });
        return res.status(200).json({ message: "Deleted Successfully" });
      }
    } catch (error) {
      return res.status(401).send("Error");
    }
  }
}

const accountController = new Account();
module.exports = accountController;
