const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema({
  index: Number,
  name: String,
  isActive: Boolean,
  registered: Date,
  age: Number,
  gender: String,
  eyecolor: String,
  favouriteFruit: String,
  company: {
    title: String,
    email: String,
    phone: String,
    location: {
      country: String,
      address: String,
    },
  },
  tags: [String],
});

const personModel = mongoose.model("person", personSchema);
module.exports = personModel;
