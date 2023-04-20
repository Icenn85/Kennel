const {Schema, model} = require("mongoose");
// const Joi = require("joi");

const kennelSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: [true, "Name for kennel is required"],
    },
    capacity: {
      type: Number,
    },
    pets: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    address: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Kennel = model("kennel", kennelSchema);

// const addKennelSchema = Joi.object({
//   name: Joi.string().required(),
//   capacity: Joi.number(),
//   address: Joi.string(),
// });

// const kennelSchemas = {
//   addKennelSchema,
// };

module.exports = {
  Kennel,
  // kennelSchemas,
};
