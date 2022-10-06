const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const jwt_key = process.env.NODE_JWT_KEY;

exports.authorize = (req, res, next) => {
  // get authorization header
  const authHeader = req.headers['authorization'];
  // get token from header
  const token = authHeader == undefined ? null : authHeader.split(' ')[1];
  // if token is exist then it is a admin or author, if not then it is a user
  if (token == null) {
    // return user
    req.user = {
      user_type: 'guest',
    };
    // add authorization header to request
    next();
  } else {
    // verify token
    try {
      const user = jwt.verify(token, jwt_key);
      // set user
      req.user = user;
      next();
    } catch (err) {
      // return user
      req.user = {
        user_type: 'guest',
      };
      // add authorization header to request
      next();
    }
  }
};
