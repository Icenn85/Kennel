const { HttpError } = require("../../helpers");

async function createKennel(req, res, next) {
  try {
    const { name, capacity, pets, address } = req.body;
    if (!name || !email || !phone) {
      return next(HttpError(400, "missing required name field"));
    }
    const { _id } = req.user;
    const newContact = await Contact.create({
        name,
        capacity,
        pets,
        address,
        owner: _id,
    });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createKennel,
};
