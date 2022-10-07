const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const userModel = require('../../models/v1/userModel.js');
const lang = require('../../lang/en.json');
const errors = require('../../utils/errors.json');

dotenv.config();
const jwt_key = process.env.NODE_JWT_KEY;
const message = { message: lang.Unauthorized };

// route GET /api/v1/users
// get all users from db
exports.find = async (req) => {
  return await userModel.find({});
};

// route GET /api/v1/users/:id
// get specific users from db using id
exports.findById = async (req) => {
  const user = req?.user;
  const id = req?.params?.id;
  if (user.role === 'admin' || (user.role === 'user' && user._id === id)) {
    return await userModel.findById(id);
  }
  return { message: errors.USER_GET_02 };
};

// route POST /api/v1/users
// create a new user
exports.create = async (req) => {
  req.body.password = await bcrypt.hash(
    req?.body?.password,
    await bcrypt.genSalt(10)
  );
  const user = req?.user;
  if (req?.body?.role === 'admin' && user?.role === 'admin') {
    req.body.role = 'admin';
  }
  return await userModel.create(req.body);
};

// route PUT /api/v1/users/:id
// update a user using id
exports.update = async (req) => {
  const user = req?.user;
  const id = req?.params?.id;
  let { username, email, password } = req.body;
  password = await bcrypt.hash(password, await bcrypt.genSalt(10));
  if (user.role === 'admin' || (user.role === 'user' && user._id === id)) {
    return await userModel.updateOne(
      { _id: id },
      { $set: { username: username, email: email, password: password } }
    );
  }
  return { message: errors.USER_PUT_01 };
};

// route DELETE /api/v1/users/:id
// delete a user using id
exports.remove = async (req) => {
  const user = req?.user;
  const id = req?.params?.id;
  if (user.role === 'admin' || (user.role === 'user' && user._id === id)) {
    return await userModel.deleteOne({ _id: id });
  }
  return { message: errors.USER_DELETE_01 };
};

// route POST /api/v1/login
// login a user
exports.login = async (req) => {
  // search DB for this user
  const user = await userModel.findOne({ email: req?.body?.email });
  // check if user is found or not
  if (!user) {
    // return not found
    return { message: 'User not found!' };
  }
  // check the password if it is equal or not
  const password = await bcrypt.compare(req?.body?.password, user.password);
  // if the password is correct
  if (password) {
    // generate a token for this user
    const token = await jwt.sign(
      { _id: user._id, role: user.role, email: user.email },
      jwt_key,
      { expiresIn: '1w' }
    );
    // return the token to the response
    return { token: token };
  }
  // if the password is wrong
  return { message: 'User not found!, or password is incorrect.' };
};
