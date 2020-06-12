const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("../database/index");
require("dotenv").config();

const cryptoRouter = require("./routers/crypto");

const app = express();
const public = path.resolve(__dirname, "../public");

app.use(morgan("dev"));
app.use(express.static(public));
app.use("/crypto", cryptoRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
