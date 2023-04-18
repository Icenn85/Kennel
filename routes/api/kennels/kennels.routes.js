const express = require("express");
const {
  getAllKennels,
  getKennelById,
  createKennel,
  deleteKennelById,
  deleteAllKennels,
  findAllPetsInKennel,
} = require("../../../controllers");

const router = express.Router();

router.get("/", auth, getAllKennels);

module.exports = router;