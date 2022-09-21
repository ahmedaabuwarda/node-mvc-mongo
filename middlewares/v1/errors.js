exports.errorHandler = async (err, req, res, next) => {
  try {
    next(err);
  } catch (e) {
    console.log(e);
  }
};
