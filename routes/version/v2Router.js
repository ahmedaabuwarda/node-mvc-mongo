const express = require('express');
// import userRouter router
const userRouter = require('../v2/userRouter.js');
// import authenticateRouter
const authenticateRouter = require('../v2/authenticateRouter.js');
// create and export v2Router
const v2Router = express.Router();
// use authentication router
v2Router.use(authenticateRouter);
// use userRouter to handle /users
v2Router.use('/users', userRouter);

// export v2Router
module.exports = v2Router;
