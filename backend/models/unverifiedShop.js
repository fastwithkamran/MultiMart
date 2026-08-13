const mongoose = require("mongoose");

const UnverifiedShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your shop name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your shop email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter your phoneNumber"],
  },
  address: {
    required: [true, "Please enter your address"],
    type: String,
  },
  description: {
    type: String,
  },
  role: {
    type: String,
    default: "seller",
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  zipCode: {
    type: Number,
    required: [true, "Please enter your zipCode"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 1200,
  },
});

module.exports = mongoose.model("UnverifiedShop", UnverifiedShopSchema);
