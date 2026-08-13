const Shop = require("../models/shop");
const UnverifiedShop = require("../models/unverifiedShop.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const sendMail = require("../utils/sendMail.js");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken.js");
const { uploadToCloudinary, deleteFromCloudinary } = require("../multer");

const handleCreateShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password, address, phoneNumber, zipCode } = req.body;

    const shopNameExist = await Shop.findOne({ name });

    if (shopNameExist)
      return next(
        new ErrorHandler("Name is already chosen by other vendor", 400),
      );

    const sellerEmail = await Shop.findOne({ email });

    if (sellerEmail) {
      return next(new ErrorHandler("Seller already exits", 400));
    }

    const uploadImage = await uploadToCloudinary(
      req.file.buffer,
      req.file.originalname,
    );

    const seller = await UnverifiedShop.create({
      name,
      email,
      password,
      address,
      phoneNumber,
      avatar: {
        public_id: uploadImage.public_id,
        url: uploadImage.secure_url,
      },
      zipCode,
    });

    const id = seller._id;

    const activationToken = createActivationToken({ id });
    let activationUrl;

    if (process.env.NODE_ENV === "production") {
      activationUrl = `${process.env.FRONTEND_API}/seller/activation/${activationToken}`;
    } else {
      activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;
    }

    await sendMail({
      email: seller.email,
      subject: "Activate your shop",
      message: `Hello ${seller.name}, please click on the link to activate your shop:
      ${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email: ${seller.email} to activate shop`,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, error.statusCode || 500));
  }
});

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.Activation_Secret, {
    expiresIn: "15m",
  });
};

// activate user through mail
const handleActivateShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newSeller = jwt.verify(
      activation_token,
      process.env.Activation_Secret,
    );

    if (!newSeller) {
      return next(new ErrorHandler("Invalid Token", 400));
    }

    const { id } = newSeller;
    const unverifiedSellerData = await UnverifiedShop.findById(id);

    if (!unverifiedSellerData) {
      return next(new ErrorHandler("Token had already used", 400));
    }

    const { name, email, password, address, phoneNumber, avatar, zipCode } =
      unverifiedSellerData;

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

    const result = sendToken(seller);
    res.status(201).cookie("Shoptoken", result.token, result.options).json({
      success: true,
      seller,
      token: result.token,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, error.statusCode || 500));
  }
});

// login shop
const handleShopLogin = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new ErrorHandler("Provide all fields", 400));

    const seller = await Shop.findOne({ email }).select("+password");

    if (!seller)
      return next(new ErrorHandler("Incorrect Password or Email", 400));

    const isPasswordValid = await seller.comparePassword(password);

    if (!isPasswordValid)
      return next(new ErrorHandler("Incorrect Password or Email", 400));

    const result = sendToken(seller);

    res.status(201).cookie("Shoptoken", result.token, result.options).json({
      success: true,
      token: result.token,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, error.statusCode || 500));
  }
});

// get shop Info
const handleGetShopInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);

    res.status(200).json({
      success: true,
      shop,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, error.statusCode || 500));
  }
});

// update shop avatar
const handleUpdateShopAvatar = catchAsyncErrors(async (req, res, next) => {
  try {
    const existsShop = await Shop.findById(req.seller.id);

    const existAvatarPath = existsShop.avatar.public_id;

    await deleteFromCloudinary(existAvatarPath);

    const result = await uploadToCloudinary(
      req.file.buffer,
      req.file.originalname,
    );

    const shop = await Shop.findByIdAndUpdate(
      req.seller.id,
      {
        avatar: { public_id: result.public_id, url: result.secure_url },
      },
      { returnDocument: "after" },
    );

    return res.status(200).json({
      success: true,
      shop,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, error.statusCode || 500));
  }
});

// update shop information
const handleUpdateShopInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, description, address, phoneNumber, zipCode } = req.body;

    const shop = await Shop.findById(req.seller.id);

    if (!shop) {
      return next(new ErrorHandler("Shop not found", 400));
    }

    if (shop.name !== name) {
      const shopNameExist = await Shop.findOne({ name });

      if (shopNameExist)
        return next(
          new ErrorHandler("Name is already chosen by other vendor", 400),
        );
    }

    shop.name = name;
    shop.description = description;
    shop.address = address;
    shop.zipCode = zipCode;
    shop.phoneNumber = phoneNumber;

    await shop.save();

    res.status(200).json({
      success: true,
      shop,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, error.statusCode || 500));
  }
});

module.exports = {
  handleCreateShop,
  handleActivateShop,
  handleShopLogin,
  handleGetShopInfo,
  handleUpdateShopAvatar,
  handleUpdateShopInfo,
};
