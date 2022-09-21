const express = require('express');
// import userRouter router
const userRouter = require('../v1/userRouter.js');
// import authenticateRouter
const authenticateRouter = require('../v1/authenticateRouter.js');
// create and export v2Router
const v1Router = express.Router();
// use authentication router
v1Router.use(authenticateRouter);
// use userRouter to handle /users
v1Router.use('/users', userRouter);

// export v1Router
module.exports = v1Router;
