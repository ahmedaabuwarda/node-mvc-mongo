const express = require('express');

const userController = require('../../controllers/v1/userController.js');

const userRouter = express.Router();

userRouter
  .route('/')
  .get(userController.index)
  .post(userController.create);

userRouter
  .route('/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.remove);

// export user router
module.exports = userRouter;
