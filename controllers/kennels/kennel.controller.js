const { HttpError, tryCatchWrapper } = require("../../helpers");
const { Kennel } = require("../../models/index");

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
  const { id } = req.params;
  const kennel = await Kennel.findById(id);
  if (!kennel) {
    return next(HttpError(404, "Kennel not found"));
  }
  return res.status(200).json(kennel);
};

async function getAllKennels(req, res) {
  const kennels = await Kennel.find({});
  res.status(200).json(kennels);
}

const deleteKennelById = async (req, res) => {
  const { id } = req.params;
  const kennel = await Kennel.findByIdAndRemove(id);
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
  const { id } = req.params;
  const kennel = await Kennel.findById(id).populate("pets").exec((err, kennel) => {
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
