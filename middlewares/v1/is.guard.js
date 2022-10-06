const errors = require('../../utils/errors.json');

exports.admin = async (req, res, next) => {
  if (req?.user?.role === 'admin') next();
  else return res.status(401).json({ message: errors.AUTH_ADMIN_01 });
};

exports.user = async (req, res, next) => {
  if (req?.user?.role === 'user') next();
  else return res.status(401).json({ message: errors.AUTH_USER_01 });
};

exports.guest = async (req, res, next) => {
  next();
};

exports.admin_or_user = async (req, res, next) => {
  if (req?.user?.role === 'admin' || req?.user?.role === 'user') next();
  else return res.status(401).json({ message: errors.AUTH_ADMIN_OR_USER_01 });
};
