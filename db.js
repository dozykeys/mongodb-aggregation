const mongoose = require("mongoose");
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
      .then((suc) => {
        log.info("Connected to MongoDB");
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        log.error("Failed to connect to MongoDB");
        console.log("Failed to connect to MongoDB");
      });
  }
}

module.exports = db;
