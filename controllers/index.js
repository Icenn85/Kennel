const {
  createKennel,
  getKennelById,
  getAllKennels,
  deleteKennelById,
  deleteAllKennel,
  findAllPetsInKennel,
} = require("./kennels/kennel.controller");

module.exports = {
  createKennel,
  getKennelById,
  getAllKennels,
  deleteKennelById,
  deleteAllKennel,
  findAllPetsInKennel,
};