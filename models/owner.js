const { Schema, model } = require("mongoose");

const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;

const ownerSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: [true, "Name is required"],
    },
    age: {
      type: Number,
    },
    pets: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    //   required: true,
    },
    birthday: {
      type: String,
      // 19-09-1985
      match: dateRegexp,
      required: true,
    },
    gender: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Owner = model("owner", ownerSchema);

module.exports = {
  Owner,
};