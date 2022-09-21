const userModel = require('../../models/v1/userModel.js');

exports.find = async () => {
  return await userModel.find();
};

exports.findById = async (id) => {
  return await userModel.findById(id);
};

exports.create = async (user) => {
  return await userModel.create(user);
};

exports.update = async (id, user) => {
    return await userModel.update(id, user);
}

exports.remove = async (id) => {
    return await userModel.remove(id);
}
