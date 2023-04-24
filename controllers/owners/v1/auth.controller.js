const { Owner } = require("../../../models/index");
const { HttpError } = require("../../../helpers/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

async function register(req, res, next) {
    try {
        const { email, password, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newOwner = await Owner.create({
          email,
          password: hashedPassword,
          name,
        });
        
        return res.status(201).json({
          email: newOwner.email,
          name: newOwner.name,
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      return next(HttpError(409, "Email already in use"));
    }
    next(error);
  }
};

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const storedOwner = await Owner.findOne({
      email,
    });
    if (!storedOwner) {
      return next(HttpError(401, "Email or password invalid"));
    }

    const passwordCompare = await bcrypt.compare(
      password,
      storedOwner.password
    );
    if (!passwordCompare) {
      return next(HttpError(401, "Email or password invalid"));
    }
  
    const payload = { id: storedOwner._id };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
      await Owner.findByIdAndUpdate(storedOwner._id, { token });
    return res.status(201).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

async function current(req, res, next) {
  try {
    const { email, name } = req.owner;
    return res.status(200).json({
      email,
      name,
    });
  } catch (error) {
    next(error);
  }
};

async function logout(req, res, next) {
  try {
      const { _id } = req.owner;
      const logoutOwner = await Owner.findByIdAndUpdate(_id, { token: "" });
    return res.status(204).json(logoutOwner);
  } catch (error) {
    next(error);
  }
}



module.exports = {
  register,
  login,
  current,
  logout,
};
