const ErrorHandler = require("./ErrorHandler.js");
const catchAsyncErrors = require("./catchAsyncErrors.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const Shop = require("../models/shop.js");

// Verify User
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { Usertoken } = req.cookies;

  if (!Usertoken) {
    return next(new ErrorHandler("Please Login to continue", 401));
  }

  const verifyUser = jwt.verify(Usertoken, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(verifyUser.id);

  next();
});

// Verify Seller
exports.isAuthenticatedSeller = catchAsyncErrors(async (req, res, next) => {
  const { Shoptoken } = req.cookies;

  if (!Shoptoken) {
    return next(new ErrorHandler("Please Login to continue", 401));
  }

  const verifySeller = jwt.verify(Shoptoken, process.env.JWT_SECRET_KEY);

  req.seller = await Shop.findById(verifySeller.id);
  next();
});
