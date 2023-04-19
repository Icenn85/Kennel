const { HttpError, tryCatchWrapper } = require("../../helpers");
const { Kennel } = require("../../helpers");

async function createKennel(req, res, next) {
  const { name, capacity, pets, address } = req.body;
   if (!name || !pets) {
     return next(HttpError(400, "missing required name field"));
  }
  const newKennel = await Kennel.create({
    name,
    capacity,
    pets,
    address,
  });
  res.status(201).json(newKennel);
}

const getKennelById = async (req, res) => {
  const { kennelId } = req.params;
  const kennel = await Kennel.findById(kennelId);
  if (!kennel) {
    return next(HttpError(404, "Kennel not found"));
  }
  return res.status(200).json(kennel);
};

async function getAllKennels(req, res) {
  const { limit = 5, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const kennels = await Kennel.find({}).skip(skip).limit(limit);
  res.status(200).json(kennels);
}

const deleteKennelById = async (req, res) => {
  const { kennelId } = req.params;
  const kennel = await Kennel.findByIdAndRemove(kennelId);
  if (!kennel) {
    return next(HttpError(404, "Kennel not found"));
  }
  return res.status(200).json({ message: "Kennel deleted successfully" });
};

const deleteAllKennels = async (req, res) => {
  const kennels = await Kennel.deleteMany({});
  if (!kennels) {
    return next(HttpError(404, "Kennels not found"));
  }
  return res.status(200).json({ message: "Kennels deleted successfully" });
};

const findAllPetsInKennel = async (req, res) => {
  const { kennelId } = req.params;
  const kennel = await Kennel.findById(kennelId).populate("pets").exec((err, kennel) => {
    if (!kennel) {
      return next(HttpError(404, "Pets not found"));
    }
  });
  return res.status(200).json(kennel.pets);
};


module.exports = {
  createKennel: tryCatchWrapper(createKennel),
  getKennelById: tryCatchWrapper(getKennelById),
  getAllKennels,
  deleteKennelById: tryCatchWrapper(deleteKennelById),
  deleteAllKennels: tryCatchWrapper(deleteAllKennels),
  findAllPetsInKennel: tryCatchWrapper(findAllPetsInKennel),
};
