const express = require('express');

const is = require('../../middlewares/v2/is.guard.js');
const userController = require('../../controllers/v2/userController.js');
const errorMiddleware = require('../../middlewares/v2/errorMiddleware.js');

const authenticateRouter = express.Router();

// /api/v1/login
authenticateRouter
  .route('/login')
  .post([is.guest], errorMiddleware(userController.login));

// /api/v1/register
authenticateRouter
  .route('/register')
  .post([is.guest], errorMiddleware(userController.create));

// logout post
authenticateRouter.route('/logout').post(async (req, res, next) => {
  // TODO: implement logout
  delete req.user;
  return res.json({
    message: 'Logged out successfully',
  });
});

module.exports = authenticateRouter;
