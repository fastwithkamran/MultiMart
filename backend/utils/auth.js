const ErrorHandler = require("./ErrorHandler.js");
const catchAsyncErrors = require("./catchAsyncErrors.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to continue", 401));
  }

  const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(verifyUser.id);

  return res.status(200).json({
    success: true,
    user,
  });
});
