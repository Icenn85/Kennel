const { Schema, model } = require("mongoose");
const Joi = require("joi");

const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pet",
        required: true,
      },
    ],
    birthday: {
      type: String,
      // 19-09-1985
      match: dateRegexp,
      // required: true,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const ownerSchemas = {
  registerSchema,
  loginSchema,
};

const Owner = model("Owner", ownerSchema);

module.exports = {
  Owner,
  ownerSchemas,
};