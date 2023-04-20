const { Schema, model } = require("mongoose");
// const Joi = require("joi");

const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;

const petSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "Nickname is required"],
      minlength: [3, "Name must be atleast 3 letters"],
    },
    age: {
      type: Number,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Owner",
      // required: true,
    },
    kennel: {
      type: Schema.Types.ObjectId,
      ref: "Kennel",
      // required: true,
    },
    birthday: {
      type: String,
      // 19-04-2023
      match: dateRegexp,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Pet = model("pet", petSchema);

// const addPetSchema = Joi.object({
//   nickname: Joi.string().required(),
//   age: Joi.number(),
//   birthday: Joi.string().required(),
// });

// const petSchemas = {
//   addPetSchema,
// };

module.exports = {
  Pet,
//   petSchemas,
};
