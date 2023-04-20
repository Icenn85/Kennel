const express = require("express");
const ctrl = require("../../../../controllers/owners/v1/owner.controller");

const router = express.Router();

router.post("/", ctrl.createOwner);
router.get("/:id", ctrl.getOwnerById);
router.get("/", ctrl.getAllOwners);
router.delete("/:id", ctrl.deleteOwnerById);
router.delete("/", ctrl.deleteAllOwners);
router.get("/:id/pets", ctrl.findAllPetsSameOwner);

module.exports = router;
