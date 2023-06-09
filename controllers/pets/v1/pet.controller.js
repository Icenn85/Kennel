const { HttpError, tryCatchWrapper } = require("../../../helpers");
const { Pet } = require("../../../models");

async function createPet(req, res, next) {
  const { nickname, age, kennel, birthday } = req.body;
  const ownerId = req.owner._id;
  if (!nickname ) {
    return next(HttpError(400, "missing required name field"));
  }
  const newPet = await Pet.create({
    nickname,
    age,
    kennel,
    birthday,
    owner: ownerId,
  });
  res.status(201).json(newPet);
}

const getPetById = async (req, res, next) => {
  const pet = await Pet.findById(id).lean();
  if (!pet) {
    return next(HttpError(404, "Pet not found"));
  }
  return res.status(200).json(pet);
};

async function getAllPets(req, res) {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const pets = await Pet.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  })
    .lean();
  res.status(200).json(pets);
}

const deletePetById = async (req, res, next) => {
  const { id } = req.params;
  const pet = await Pet.findByIdAndRemove(id);
  if (!pet) {
    return next(HttpError(404, "Pet not found"));
  }
  return res.status(200).json({ message: "Pet deleted successfully" });
};

const deleteAllPets = async (req, res, next) => {
  const pets = await Pet.deleteMany({});
  if (!pets) {
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
