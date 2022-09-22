const express = require('express');

const userController = require('../../controllers/v1/userController.js');
const errorMiddleware = require('../../middlewares/v1/errorMiddleware.js');

const userRouter = express.Router();

userRouter
  .route('/')
  .get(errorMiddleware(userController.index))
  .post(errorMiddleware(userController.create));

userRouter
  .route('/:id')
  .get(errorMiddleware(userController.show))
  .put(errorMiddleware(userController.update))
  .delete(errorMiddleware(userController.remove));

// export user router
module.exports = userRouter;
