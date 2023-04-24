const express = require("express");
const ctrl = require("../../../../controllers/pets/v1/pet.controller");
const { auth } = require("../../../../helpers/index");
// const { petSchemas } = require("../../../../models");

const router = express.Router();

router.post("/", auth, ctrl.createPet);
router.get("/:id", auth, ctrl.getPetById);
router.get("/", auth, ctrl.getAllPets);
router.delete("/:id", auth, ctrl.deletePetById);
router.delete("/", auth, ctrl.deleteAllPets);

module.exports = router;
