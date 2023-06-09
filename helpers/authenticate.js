const jwt = require("jsonwebtoken");
const { Owner } = require("../models/index");
const { HttpError } = require("./HttpError");

const { SECRET_KEY } = process.env;

async function auth(req, res, next) {
    try {
      const { authorization = "" } = req.headers;
      const [bearer, token] = authorization.split(" ");

      if (bearer !== "Bearer") {
        return next(HttpError(401, "Not authorized"));
        };

        const { id } = jwt.verify(token, SECRET_KEY);
        const owner = await Owner.findById(id);
        if (!owner || !owner.token || owner.token !== token) {
          next(HttpError(401, "Owner not authorized"));
        }
        req.owner = owner;
        next();
    } catch (error) {
    return next(error);
  }
}

module.exports = {
  auth,
};