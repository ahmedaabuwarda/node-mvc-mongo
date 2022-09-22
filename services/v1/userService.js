const userModel = require('../../models/v1/userModel.js');
const bcrypt = require('bcrypt');

// route /api/v1/users
// get all users from db
exports.find = async () => {
  return await userModel.find();
};

// route /api/v1/users/:id
// get specific users from db using id
exports.findById = async (id) => {
  return await userModel.findById(id);
};

// route /api/v1/users
// create a new user
exports.create = async (user) => {
  // user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
  return await userModel.create(user);
};

// route /api/v1/users/:id
// update a user using id
exports.update = async (id, user) => {
  return await userModel.update(id, user);
};

// route /api/v1/users/:id
// delete a user using id
exports.remove = async (id) => {
  return await userModel.remove(id);
};
