const { HttpError, tryCatchWrapper } = require("../../../helpers");
const { Owner } = require("../../../models/index");

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

const getOwnerById = async (req, res) => {
  const { id } = req.params;
  const owner = await Owner.findById(id);
  if (!owner) {
    return next(HttpError(404, "Owner not found"));
  }
  return res.status(200).json(owner);
};

async function getAllOwners(req, res) {
  const { limit = 5, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const owners = await Owner.find({}).skip(skip).limit(limit);
  res.status(200).json(owners);
}

const deleteOwnerById = async (req, res) => {
  const { id } = req.params;
  const owner = await Owner.findByIdAndRemove(id);
  if (!owner) {
    return next(HttpError(404, "Owner not found"));
  }
  return res.status(200).json({ message: "Owner deleted successfully" });
};

const deleteAllOwners = async (req, res) => {
  const owners = await Owner.deleteMany({});
  if (!owners) {
    return next(HttpError(404, "Owners not found"));
  }
  return res.status(200).json({ message: "Owners deleted successfully" });
};

const findAllPetsSameOwner = async (req, res) => {
  const { id } = req.params;
  const owner = await Owner
    .findById(id)
    .populate("pets")
    .exec((err, owner) => {
      if (!owner) {
        return next(HttpError(404, "Pet not found"));
      }
    });
  return res.status(200).json(owner.pets);
};

module.exports = {
  createOwner: tryCatchWrapper(createOwner),
  getOwnerById: tryCatchWrapper(getOwnerById),
  getAllOwners,
  deleteOwnerById: tryCatchWrapper(deleteOwnerById),
  deleteAllOwners: tryCatchWrapper(deleteAllOwners),
  findAllPetsSameOwner: tryCatchWrapper(findAllPetsSameOwner),
};
