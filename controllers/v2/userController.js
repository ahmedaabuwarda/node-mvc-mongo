const userModel = require('../../models/v1/userModel.js');

// route /api/v1/users
// get all users from db
exports.index = async (req, res, next) => {
  const users = await userModel.find();
  return res.json(users);
};

// route /api/v1/users/:id
// get specific users from db using id
exports.show = async (req, res, next) => {
  const user_id = req.params.id;
  const user = await userModel.findById(user_id);
  return res.json(user);
};

// route /api/v1/users
// create a new user
exports.store = async (req, res, next) => {
  const user = await userModel.create(req.body);
  return res.status(201).json(user);
};

// route /api/v1/users/:id
// update a user using id
exports.update = async (req, res, next) => {
  const user_id = req.params.id;
  const user = await userModel.update(user_id, req.body);
  return res.status(200).json(user);
};

// route /api/v1/users/:id
// delete a user using id
exports.delete = async (req, res, next) => {
  const user_id = req.params.id;
  const user = await userModel.remove(user_id);
  return res.status(200).json(user);
};
