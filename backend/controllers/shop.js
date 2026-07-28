const Shop = require("../models/shop");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const fs = require("fs");
const sendMail = require("../utils/sendMail.js");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken.js");

const handleCreateShop = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, address, phoneNumber, zipCode } = req.body;
  const sellerEmail = await Shop.findOne({ email });

  if (sellerEmail) {
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting avatar", err);
        return next(
          new ErrorHandler(
            "Avatar cannot deleted at Duplicate User Request",
            500,
          ),
        );
      }
    });
    return next(new ErrorHandler("Seller already exits", 400));
  }

  const filename = req.file.filename;
  const fileUrl = `${req.protocol}://${req.get("host")}/${filename}`;

  const seller = {
    name,
    email,
    password,
    address,
    phoneNumber,
    avatar: {
      public_id: filename,
      url: fileUrl,
    },
    zipCode,
  };

  const activationToken = createActivationToken(seller);

  const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;

  await sendMail({
    email: seller.email,
    subject: "Activate your shop",
    message: `Hello ${seller.name}, please click on the link to activate your shop ${activationUrl}`,
  });

  res.status(201).json({
    success: true,
    message: `Please check your email: ${seller.email} to activate shop`,
  });
});

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.Activation_Secret, {
    expiresIn: "5m",
  });
};

// activate user through mail
const handleActivateShop = catchAsyncErrors(async (req, res, next) => {
  const { activation_token } = req.body;
  const newSeller = jwt.verify(activation_token, process.env.Activation_Secret);

  if (!newSeller) {
    return next(new ErrorHandler("Invalid Token", 400));
  }

  const { name, email, password, address, phoneNumber, zipCode, avatar } =
    newSeller;

  const seller_exist = await Shop.findOne({ email });

  if (seller_exist) {
    return next(new ErrorHandler("Seller already exits", 400));
  }

  const seller = await Shop.create({
    name,
    email,
    password,
    address,
    phoneNumber,
    zipCode,
    avatar,
  });

  sendToken(seller, 201, res);
});

module.exports = { handleCreateShop, handleActivateShop };
