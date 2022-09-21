const express = require('express');
const jwt = require('jsonwebtoken');

const userController = require('../../controllers/v1/userController.js');

// import { userService } from '../../../services/v1/user.mjs';

const jwt_key = process.env.NODE_JWT_KEY;
const authenticateRouter = express.Router();

// create new userService
// const User = new userService();

authenticateRouter.post('/login', async (req, res) => {
  // get username and password from request body
  const { username, password } = req.body;
  // check if username and password are set
  if (!username || !password) {
    return res.status(400).json({
      message: 'Missing body',
    });
  }
  try {
    const user = await User.findByUsername(username);
    // check if user exists or empty
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    if (user.password !== password) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }
    const token = await jwt.sign(
      { user_id: user.id, user_type: 'user' },
      jwt_key,
      { expiresIn: '1w' }
    );
    return res.json({
      token,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.sqlMessage,
    });
  }
});

// register new user
authenticateRouter.post('/register', async (req, res) => {
  // get username and password from request body
  const { name, email, username, password } = req.body;
  // check if username and password are set
  if (!username || !password) {
    return res.status(400).json({
      message: 'Missing body',
    });
  }
});

// logout post
authenticateRouter.post('/logout', async (req, res) => {
  // TODO: implement logout
  delete req.user;
  return res.json({
    message: 'Logged out successfully',
  });
});

module.exports = authenticateRouter;
