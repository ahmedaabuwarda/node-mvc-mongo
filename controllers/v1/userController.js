const userService = require('../../services/v1/userService.js');

// route /api/v1/users
// get all users from db
exports.index = async (req, res, next) => {
  return res.json(await userService.find());
};

// route /api/v1/users/:id
// get specific users from db using id
exports.show = async (req, res, next) => {
  const id = req.params.id;
  return res.json(await userService.findById(id));
};

// route /api/v1/users
// create a new user
exports.create = async (req, res, next) => {
  const user = await userService.create(req.body);
  return res.status(201).json(user);
};

// route /api/v1/users/:id
// update a user using id
exports.update = async (req, res, next) => {
  const id = req.params.id;
  const user = await userService.update(id, req.body);
  return res.status(200).json(user);
};

// route /api/v1/users/:id
// delete a user using id
exports.remove = async (req, res, next) => {
  const id = req.params.id;
  const user = await userService.remove(id);
  return res.status(200).json(user);
};
