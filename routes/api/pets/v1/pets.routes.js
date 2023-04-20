const express = require("express");
const ctrl = require("../../../../controllers/pets/v1/pet.controller");
// const { petSchemas } = require("../../../../models");

const router = express.Router();

router.post("/", ctrl.createPet);
router.get("/:id", ctrl.getPetById);
router.get("/", ctrl.getAllPets);
router.delete("/:id",ctrl.deletePetById);
router.delete("/", ctrl.deleteAllPets);

module.exports = router;
