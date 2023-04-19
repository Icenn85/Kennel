const express = require("express");
const ctrl = require("../../../../controllers/index");
const { kennelSchemas } = require("../../../../models");
const {
  validateBody,
  isValidId,
} = require("../../../../config");

const router = express.Router();

router.post(
  "/",
  validateBody(kennelSchemas.addKennelSchema),
  ctrl.createKennel
);
router.get("/:id", isValidId, ctrl.getKennelById);
router.get("/", ctrl.getAllKennels);
router.delete("/:id", isValidId, ctrl.deleteKennelById);
router.delete("/", ctrl.deleteAllKennel);
router.get("/:id/pets", ctrl.findAllPetsInKennel);


module.exports = router;