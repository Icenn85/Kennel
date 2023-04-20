const express = require("express");
const ctrl = require("../../../../controllers/kennels/kennel.controller");
// const { kennelSchemas } = require("../../../../models");


const router = express.Router();

router.post("/", ctrl.createKennel);
router.get("/:id", ctrl.getKennelById);
router.get("/", ctrl.getAllKennels);
router.delete("/:id", ctrl.deleteKennelById);
router.delete("/", ctrl.deleteAllKennels);
router.get("/:id/pets", ctrl.findAllPetsInKennel);


module.exports = router;