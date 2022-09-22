// this method is called when any error is encountered while using the application
module.exports = (fn) => (req, res, next) => {
  // handel errors
  // Promise.resolve(fn(req, res, next)).catch(next);
  return fn(req, res, next).catch(next);
};
