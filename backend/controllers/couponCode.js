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
    return next(new ErrorHandler(error, 500));
  }
});

module.exports = handleCreateCouponsCode;
