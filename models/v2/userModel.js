const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
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
  },
});

const userModel = new mongoose.model('User', userSchema, 'users');

module.exports = userModel;
