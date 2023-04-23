const express = require("express");
const ctrl = require("../../../../controllers/kennels/v1/kennel.controller");
// const { kennelSchemas } = require("../../../../models");

const router = express.Router();

router.post("/", ctrl.createKennel);
router.get("/:id", ctrl.getKennelById);
router.get("/", ctrl.getAllKennels);
router.delete("/:id", ctrl.deleteKennelById);
router.delete("/", ctrl.deleteAllKennels);
router.get("/:id/pets", ctrl.findAllPetsInKennel);
router.patch("/:kennelId/:petId", ctrl.addPetToKennel);
router.delete("/:kennelId/:petId", ctrl.removePetfromKennel);

module.exports = router;
