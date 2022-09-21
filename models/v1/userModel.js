const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'name',
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    default: 'user',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    default: 'user@gmail.com',
  },
  password: {
    type: String,
    required: true,
    default: 'password',
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
    enumNames: ['user', 'admin'],
  },
  token: {
    type: String,
    unique: true,
    default: 'token',
  },
});

const userModel = new mongoose.model('User', userSchema, 'users');

module.exports = userModel;
