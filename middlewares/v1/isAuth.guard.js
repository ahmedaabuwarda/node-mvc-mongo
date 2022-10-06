const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const lang = require('../../lang/en.json');

dotenv.config();
const jwt_key = process.env.NODE_JWT_KEY;

module.exports = async function isAuth(req, res, next) {
  // get authorization header
  const authHeader = req.headers.authorization;
  // get token from header
  const token = authHeader == undefined ? null : authHeader.split(' ')[1];
  // if token is exist then it is a admin or author, if not then it is a user
  if (token == null) {
    // return Unauthorized
    return res.status(401).send({
      message: lang.unauthorized,
    });
  } else {
    // verify token
    try {
      const user = await jwt.verify(token, jwt_key);
      // set user
      req.user = user;
      // continue to the next middleware
      next();
    } catch (err) {
      // return Unauthorized
      return res.status(401).send({
        message: lang.unauthorized,
      });
    }
  }
};
