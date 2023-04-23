const { HttpError, tryCatchWrapper } = require("../../helpers");
const { Kennel } = require("../../models/index");
const { Pet } = require("../../models/index");


async function createKennel(req, res, next) {
  try {
    const { name, capacity, pets, address } = req.body;
   if (!name || !pets) {
     return next(HttpError(400, "missing required field"));
  }
  const newKennel = await Kennel.create({
    name,
    capacity,
    pets,
    address,
  });
  res.status(201).json(newKennel);
    
  } catch (error) {
    next(error);
  }
  
}

const getKennelById = async (req, res, next) => {
  const { id } = req.params;
  const kennel = await Kennel.findById(id).lean();
  if (!kennel) {
    return next(HttpError(404, "Kennel not found"));
  }
  return res.status(200).json(kennel);
};

async function getAllKennels(req, res) {
  const kennels = await Kennel.find({}).lean();
  res.status(200).json(kennels);
}

const deleteKennelById = async (req, res, next) => {
  const { id } = req.params;
  const kennel = await Kennel.findByIdAndRemove(id);
  if (!kennel) {
    return next(HttpError(404, "Kennel not found"));
  }
  return res.status(200).json({ message: "Kennel deleted successfully" });
};

const deleteAllKennels = async (req, res, next) => {
  const kennels = await Kennel.deleteMany({});
  if (!kennels) {
    return next(HttpError(404, "Kennels not found"));
  }
  return res.status(200).json({ message: "Kennels deleted successfully" });
};

const findAllPetsInKennel = async (req, res, next) => {
  const { id } = req.params;
  const kennel = await Kennel.findById(id).populate("pets").lean();
  if (!kennel) {
    return next(HttpError(404, "Pets not found"));
  }
  return res.status(200).json(kennel.pets);
};

const addPetToKennel = async (req, res, next) => {
  try {
    const { petId, kennelId } = req.params;

    const pet = await Pet.findById(petId).lean();
    if (!pet) {
      return next(HttpError(404, "Pet not found"));
    }
    const kennel = await Kennel.findOneAndUpdate(
      { id: kennelId },
      { $push: { pets: pet } },
      { new: true }
    );
    if (!kennel) {
      return next(HttpError(404, "Pets not included"));
    }
    return res.status(200).json(kennel);    
  } catch (error) {
    next(error);
  }
};

const removePetfromKennel = async (req, res, next) => {
  try {
    const { petId, kennelId } = req.params;
    const kennel = await Kennel.findOneAndUpdate(
      { id: kennelId },
      { $pull: { pets: petId } },
      { new: true }
    );
    if (!kennel) {
      return next(HttpError(404, "Pets not deleted"));
    }
    return res.status(200).json(kennel);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createKennel,
  getKennelById: tryCatchWrapper(getKennelById),
  getAllKennels,
  deleteKennelById: tryCatchWrapper(deleteKennelById),
  deleteAllKennels: tryCatchWrapper(deleteAllKennels),
  findAllPetsInKennel: tryCatchWrapper(findAllPetsInKennel),
  addPetToKennel,
  removePetfromKennel,
};
