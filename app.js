const express = require("express");
const __Person = require("./models/person");
const mongoose = require("mongoose");
const log = require("./config/log4js");
const test = require("./routes/test");
const bParser = require("body-parser");

const db = require("./db");
const app = express();

app.use("/test", test);
app.use(bParser.urlencoded({ extended: false }));
app.use(express.json());

new db(log).connect("mongodb://localhost:27017/Person");

app.listen(9000, () => {
  log.info("🚀 listening to server on port 9000");
  console.log("🚀 listening to server on port 9000");
});
