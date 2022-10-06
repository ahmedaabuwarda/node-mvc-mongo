const userService = require('../../services/v1/userService.js');

// route /api/v1/users
// get all users from db
exports.index = async (req, res, next) => {
  return res.json(await userService.find(req));
};

// route /api/v1/users/:id
// get specific users from db using id
exports.show = async (req, res, next) => {
  return res.json(await userService.findById(req));
};

// route /api/v1/users && /api/v1/register
// create a new user
exports.create = async (req, res, next) => {  
  return res.status(201).json(await userService.create(req));
};

// route /api/v1/users/:id
// update a user using id
exports.update = async (req, res, next) => {
  return res.status(200).json(await userService.update(req));
};

// route /api/v1/users/:id
// delete a user using id
exports.remove = async (req, res, next) => {
  return res.status(200).json(await userService.remove(req));
};

// route /api/v1/login
// login a user
exports.login = async (req, res, next) => {
  return res.json(await userService.login(req));
};
