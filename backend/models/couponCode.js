const mongoose = require("mongoose");
const couponCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please enter your Coupon Code name!"],
  },
  value: {
    type: Number,
    required: [true, "Please enter your Coupon Code Value!"],
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  shop: {
    type: Object,
    required: [true, "Shop not found!"],
  },
  selectedProduct: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CouponCode", couponCodeSchema);
