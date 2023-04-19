const {
  createKennel,
  getKennelById,
  getAllKennels,
  deleteKennelById,
  deleteAllKennels,
  findAllPetsInKennel,
} = require("./kennels/kennel.controller");

const {
  createPet,
  getPetById,
  getAllPets,
  deletePetById,
  deleteAllPets,
} = require("./pets/v1/pet.controller");

module.exports = {
  createKennel,
  getKennelById,
  getAllKennels,
  deleteKennelById,
  deleteAllKennels,
  findAllPetsInKennel,
  createPet,
  getPetById,
  getAllPets,
  deletePetById,
  deleteAllPets,
};