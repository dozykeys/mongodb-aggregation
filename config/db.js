const mongoose = require("mongoose");
const __Person = require("../models/person");
const db_seeds = require("./persons");
const log = require("./log4js");

const options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
class db {
  constructor(log) {
    this.log = log;
  }

  connect(DB_URL) {
    const log = this.log;
    mongoose
      .connect(DB_URL, options)
      .then(async (suc) => {
        log.info("Connected to MongoDB");
        console.log("Connected to MongoDB");
        const person = await __Person.find({}).countDocuments();

        if (person < 1) {
          __Person
            .insertMany(db_seeds)
            .then(() => {
              log.info("Persons records has been added");
              console.log("Persons records has been added");
            })
            .catch((err) => {
              log.error("Persons records could not be added");
              console.log("Persons records could not be added");
              console.log(err);
            });
        } else {
          log.info("Persons records already set up");
          console.log("Persons records already set up");
        }
      })
      .catch((err) => {
        log.error("Failed to connect to MongoDB");
        console.log("Failed to connect to MongoDB");
      });
  }
}

module.exports = db;
