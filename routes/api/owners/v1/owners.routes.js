const express = require("express");
const ctrl = require("../../../../controllers/owners/v1/owner.controller");
const { auth } = require("../../../../helpers/index");

const router = express.Router();

router.post("/", auth, ctrl.createOwner);
router.get("/:id", auth, ctrl.getOwnerById);
router.get("/", auth, ctrl.getAllOwners);
router.delete("/:id", auth, ctrl.deleteOwnerById);
router.delete("/", auth, ctrl.deleteAllOwners);
router.get("/:id/pets", auth, ctrl.findAllPetsSameOwner);
router.patch("/:ownerlId/:petId", auth, ctrl.addPetToOwner);
router.delete("/:ownerlId/:petId", auth, ctrl.removePetfromOwner);

module.exports = router;

