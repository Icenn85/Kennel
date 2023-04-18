// const { Kennel } = require("../../models/contacts");

async function getAllKennels(req, res) {
  const { limit = 5, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const kennels = await Kennel.find({ owner: _id }).skip(skip).limit(limit);
  res.status(200).json(kennels);
}

module.exports = {
  getAllKennels,
};
