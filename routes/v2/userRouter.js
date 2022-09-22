const express = require('express');

const userController = require('../../controllers/v2/userController.js');
const errorHandlerMiddleware = require('../../middlewares/v2/errorHandlerMiddleware.js');

const userRouter = express.Router();

userRouter
  .route('/')
  .get(errorHandlerMiddleware(userController.index))
  .post(errorHandlerMiddleware(userController.create));

userRouter
  .route('/:id')
  .get(errorHandlerMiddleware(userController.show))
  .put(errorHandlerMiddleware(userController.update))
  .delete(errorHandlerMiddleware(userController.remove));

// export user router
module.exports = userRouter;
