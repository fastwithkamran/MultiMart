const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cart: {
    type: Array,
    required: [true, "Cart Items Not Found!"],
  },
  shippingAddress: {
    type: Object,
    required: [true, "Shipping Address Not Found"],
  },
  user: {
    type: Object,
    required: [true, "User Not Found"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total Price Not Found"],
  },
  status: {
    type: String,
    default: "Processing",
  },
  //   For Stripe and Paypal
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
