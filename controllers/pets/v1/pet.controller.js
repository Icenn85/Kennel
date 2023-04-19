const { HttpError, tryCatchWrapper } = require("../../../helpers");
const { Pet } = require("../../../models");

async function createPet(req, res, next) {
  const { nickname, age, owner, kennel, birthday } = req.body;
  if (!nickname || !owner || !kennel) {
    return next(HttpError(400, "missing required name field"));
  }
  const newPet = await Pet.create({
    nickname,
    age,
    owner,
    kennel,
    birthday,
  });
  res.status(201).json(newPet);
}

const getPetById = async (req, res) => {
  const { petlId } = req.params;
  const pet = await Pet.findById(petlId);
  if (!pet) {
    return next(HttpError(404, "Pet not found"));
  }
  return res.status(200).json(pet);
};

async function getAllPets(req, res) {
  const { limit = 5, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const pets = await Pet.find({}).skip(skip).limit(limit);
  res.status(200).json(pets);
}

const deletePetById = async (req, res) => {
  const { petId } = req.params;
  const pet = await Pet.findByIdAndRemove(petId);
  if (!pet) {
    return next(HttpError(404, "Pet not found"));
  }
  return res.status(200).json({ message: "Pet deleted successfully" });
};

const deleteAllPets = async (req, res) => {
  const pets = await Kennel.deleteMany({});
  if (!kennels) {
    return next(HttpError(404, "Pets not found"));
  }
  return res.status(200).json({ message: "Pets deleted successfully" });
};

module.exports = {
  createPet: tryCatchWrapper(createPet),
  getPetById: tryCatchWrapper(getPetById),
  getAllPets,
  deletePetById: tryCatchWrapper(deletePetById),
  deleteAllPets: tryCatchWrapper(deleteAllPets),
};
