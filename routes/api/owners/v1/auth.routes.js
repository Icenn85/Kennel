const express = require("express");
const { ownerSchemas } = require("../../../../models/index");
const authCtrl = require("../../../../controllers/owners/v1/auth.controller");
const { auth } = require("../../../../helpers/index")

const authRouter = express.Router();

authRouter.post("/register", authCtrl.register);
authRouter.post("/login", authCtrl.login);
authRouter.get("/current", auth, authCtrl.current);
authRouter.post("/logout", auth, authCtrl.logout);


module.exports = {
  authRouter,
};