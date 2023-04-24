const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { Kennel } = require("./kennel");
const { Pet } = require("./pet");
const { Owner, ownerSchemas } = require("./owner");

module.exports = {
  Kennel,
  Pet,
  Owner,
  ownerSchemas,
  // kennelSchemas,
  // petSchemas,
};

dotenv.config();

const { HOST_URI } = process.env;
mongoose.set("strictQuery", true);

mongoose
  .connect(HOST_URI)
  .then(() => {
      console.log("Connected to DB!");
    })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
