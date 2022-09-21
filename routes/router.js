const express = require('express');
/**
 * @router version you can add your own custom express version
 */
// import router versions
const v1Router = require('./version/v1Router.js');
// const v2Router = require('./version/v2Router.js');
// create router from express router
const router = express.Router();
// use v1Router to handle requests to /api/v1
router.use('/v1', v1Router);
// use v2Router to handle requests to /api/v2
// router.use('/v2', v2Router);
// add v3Router here...

// export router
module.exports = router;
