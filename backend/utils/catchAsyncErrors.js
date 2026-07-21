module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(res, res, next)).catch(next);
};
