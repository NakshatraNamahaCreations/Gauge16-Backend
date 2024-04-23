const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected........."))
  .catch((err) => console.log("Database Not Connected!!!", err));

app.use(morgan("dev"));
app.use(cors());
app.use(express.static("Public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const items = require("./Route/Master/items");
const itemgroups = require("./Route/Master/itemGroups");
const accounts = require("./Route/Master/accounts");
const accountgroups = require("./Route/Master/accountGroup");
const customers = require("./Route/Master/customers");
const vendors = require("./Route/Master/vendors");
const quotation = require("./Route/Transaction/Quotation");
const salesorder = require("./Route/Transaction/Salesorder");
const challan = require("./Route/Transaction/Delivertchallan");
const salesReturn = require("./Route/Transaction/Salesreturn");
const purchaseReturns = require("./Route/Purchase/purchaseReturns");
const creditnote = require("./Route/Transaction/Creditnote");
const debitnote = require("./Route/Purchase/Debitnote");
const skucode = require("./Route/Master/Skucode");
const deliverychallangroup = require("./Route/Deliverychallan/Deliverychallangroup");
const purchaseinvoice = require("./Route/Purchase/Purchaseinvoice");
const purchaseorder = require("./Route/Purchase/purchaseOrder");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//creating Routes
app.use("/api/master/items", items);
app.use("/api/master/itemgroups", itemgroups);
app.use("/api/master/accounts", accounts);
app.use("/api/master/accountgroups", accountgroups);
app.use("/api/master/customers", customers);
app.use("/api/master/vendors", vendors);
app.use("/api/transaction/quotation", quotation);
app.use("/api/transaction/salesorder", salesorder);
app.use("/api/transaction/challan", challan);
app.use("/api/transaction/return", salesReturn);
app.use("/api/purchase/purchasereturns", purchaseReturns);
app.use("/api/transaction/creditnote", creditnote);
app.use("/api/purchase/debitnote", debitnote);
app.use("/api/master/skucode", skucode);
app.use("/api/deliverychallan/challangroup", deliverychallangroup);
app.use("/api/purchase/invoice", purchaseinvoice);
app.use("/api/purchase", purchaseorder);

const PORT = process.env.PORT || 9002;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
