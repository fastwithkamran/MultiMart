const Shop = require("../models/shop.js");
const CouponCode = require("../models/couponCode");

const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");

const handleCreateCouponsCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const IscouponCode = await CouponCode.find({ name: req.body.name });

    if (IscouponCode.length !== 0) {
      return next(new ErrorHandler("Coupon Code already exits", 400));
    }

    const couponCode = await CouponCode.create(req.body);

    res.status(201).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, error.statusCode || 500));
  }
});

// get all coupons of a shop
const handleGetAllCoupons = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCodes = await CouponCode.find({ "shop._id": req.params.id });
    res.status(200).json({
      success: true,
      couponCodes,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, error.statusCode || 500));
  }
});

// delete coupon
const handleDeleteCoupon = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCodes = await CouponCode.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, error.statusCode || 500));
  }
});

// get coupon code value by its name
const handleGetCoupon = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCode = await CouponCode.findOne({ name: req.params.name });

    res.status(200).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, error.statusCode || 500));
  }
});

module.exports = {
  handleCreateCouponsCode,
  handleGetAllCoupons,
  handleDeleteCoupon,
  handleGetCoupon,
};
