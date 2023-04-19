const express = require("express");
const ctrl = require("../../../../controllers/index");
const { petSchemas } = require("../../../../models");
const { validateBody, isValidId } = require("../../../../config");

const router = express.Router();

router.post(
  "/",
  validateBody(petSchemas.addPetSchema),
  ctrl.createPet
);
router.get("/:id", isValidId, ctrl.getPetById);
router.get("/", ctrl.getAllPets);
router.delete("/:id", isValidId, ctrl.deletePetById);
router.delete("/", ctrl.deleteAllPets);

module.exports = router;
