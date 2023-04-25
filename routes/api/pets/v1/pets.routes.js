const express = require("express");
const ctrl = require("../../../../controllers/pets/v1/pet.controller");
const { auth } = require("../../../../helpers/index");
// const { petSchemas } = require("../../../../models");

const router = express.Router();

router.post("/", auth, ctrl.createPet);
router.get("/:id", ctrl.getPetById);
router.get("/", ctrl.getAllPets);
router.delete("/:id", ctrl.deletePetById);
router.delete("/", ctrl.deleteAllPets);

module.exports = router;
