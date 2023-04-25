const { HttpError, tryCatchWrapper } = require("../../../helpers");
const { Owner } = require("../../../models/index");
const { Pet } = require("../../../models/index");

async function createOwner(req, res, next) {
  const { name, age, pets, birthday, gender } = req.body;
  if (!name || !pets) {
    return next(HttpError(400, "missing required name field"));
  }
  const newOwner = await Owner.create({
    name,
    age,
    pets,
    birthday,
    gender,
  });
  res.status(201).json(newOwner);
}

const getOwnerById = async (req, res, next) => {
  const { id } = req.params;
  const owner = await Owner.findById(id).lean();
  if (!owner) {
    return next(HttpError(404, "Owner not found"));
  }
  return res.status(200).json(owner);
};

async function getAllOwners(req, res) {
  const ownerId = req.owner._id;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const owners = await Owner.find({ _id: ownerId }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).lean();
  res.status(200).json(owners);
}

const deleteOwnerById = async (req, res, next) => {
  const { id } = req.params;
  const owner = await Owner.findByIdAndRemove(id);
  if (!owner) {
    return next(HttpError(404, "Owner not found"));
  }
  return res.status(200).json({ message: "Owner deleted successfully" });
};

const deleteAllOwners = async (req, res, next) => {
  const owners = await Owner.deleteMany({});
  if (!owners) {
    return next(HttpError(404, "Owners not found"));
  }
  return res.status(200).json({ message: "Owners deleted successfully" });
};

const findAllPetsSameOwner = async (req, res, next) => {
  const { id } = req.params;
  const owner = await Owner.findById(id).populate("pets").lean();
  if (!owner) {
    return next(HttpError(404, "Pet not found"));
  }
  return res.status(200).json(owner.pets);
};

const addPetToOwner = async (req, res, next) => {
  try {
    const { petId } = req.params;
    const ownerId = req.owner._id;

    const pet = await Pet.findById(petId).lean();
    if (!pet) {
      return next(HttpError(404, "Pet not found"));
    }
    const owner = await Owner.findOneAndUpdate(
      { _id: ownerId },
      { $push: { pets: pet } },
      { new: true }
    );
    if (!owner) {
      return next(HttpError(404, "Pets not included"));
    }
    return res.status(200).json(owner);
  } catch (error) {
    next(error);
  }
};

const removePetfromOwner = async (req, res, next) => {
  try {
    const { petId } = req.params;
    const ownerId = req.owner._id;

    const owner = await Owner.findOneAndUpdate(
      { _id: ownerId },
      { $pull: { pets: petId } },
      { new: true }
    );
    if (!owner) {
      return next(HttpError(404, "Pets not deleted"));
    }
    return res.status(200).json(owner);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOwner: tryCatchWrapper(createOwner),
  getOwnerById: tryCatchWrapper(getOwnerById),
  getAllOwners,
  deleteOwnerById: tryCatchWrapper(deleteOwnerById),
  deleteAllOwners: tryCatchWrapper(deleteAllOwners),
  findAllPetsSameOwner: tryCatchWrapper(findAllPetsSameOwner),
  addPetToOwner,
  removePetfromOwner,
};
