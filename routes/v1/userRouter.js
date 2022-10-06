const express = require('express');
const isAuth = require('../../middlewares/v1/isAuth.guard.js');
const is = require('../../middlewares/v1/is.guard.js');

const userController = require('../../controllers/v1/userController.js');
const errorMiddleware = require('../../middlewares/v1/errorMiddleware.js');

const userRouter = express.Router();

userRouter
  .route('/')
  .get(
    [isAuth, is.admin],
    errorMiddleware(userController.index)
  ) // /api/v1/users
  .post(
    [is.guest],
    errorMiddleware(userController.create)
  ); // /api/v1/users

userRouter
  .route('/:id')
  .get(
    [isAuth, is.admin_or_user],
    errorMiddleware(userController.show)
  )
  .put(
    [isAuth, is.admin_or_user],
    errorMiddleware(userController.update)
  )
  .delete(
    [isAuth, is.admin_or_user],
    errorMiddleware(userController.remove)
  );

// export user router
module.exports = userRouter;
