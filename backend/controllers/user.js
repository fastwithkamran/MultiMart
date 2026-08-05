const User = require("../models/user.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const fs = require("fs");
const sendMail = require("../utils/sendMail.js");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken.js");

const handleCreateUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
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
    return next(new ErrorHandler("User already exits", 400));
  }

  const filename = req.file.filename;
  const fileUrl = `${req.protocol}://${req.get("host")}/${filename}`;

  const user = {
    name,
    email,
    password,
    avatar: {
      public_id: filename,
      url: fileUrl,
    },
  };

  const activationToken = createActivationToken(user);

  const activationUrl = `http://localhost:5173/activation/${activationToken}`;

  await sendMail({
    email: user.email,
    subject: "Activate your account",
    message: `Hello ${user.name}, please click on the link to activate your account ${activationUrl}`,
  });

  res.status(201).json({
    success: true,
    message: `Please check your email: ${user.email} to activate account`,
  });
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.Activation_Secret, {
    expiresIn: "5m",
  });
};

// activate user through mail
const handleActivateUser = catchAsyncErrors(async (req, res, next) => {
  const { activation_token } = req.body;
  const newUser = jwt.verify(activation_token, process.env.Activation_Secret);

  if (!newUser) {
    return next(new ErrorHandler("Invalid Token", 400));
  }

  const { name, email, password, avatar } = newUser;

  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return next(new ErrorHandler("User already exits", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  const result = sendToken(user);

  res.status(201).cookie("Usertoken", result.token, result.options).json({
    success: true,
    token: result.token,
  });
});

// login user
const handleUserLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Provide all fields", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Password or Email", 400));

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid)
    return next(new ErrorHandler("Incorrect Password or Email", 400));

  const result = sendToken(user);

  res.status(201).cookie("Usertoken", result.token, result.options).json({
    success: true,
    token: result.token,
  });
});

// update user information
const handleUpdateUserInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("User not found", 400));

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid)
      return next(new ErrorHandler("Incorrect Password or Email", 400));

    user.name = name;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();
    user.password = undefined;

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// update user avatar
const handleUpdateAvatar = catchAsyncErrors(async (req, res, next) => {
  try {
    const existsUser = await User.findById(req.user.id);

    const existAvatarPath = `uploads/${existsUser.avatar.public_id}`;

    fs.unlinkSync(existAvatarPath);

    const filename = req.file.filename;
    const fileUrl = `${req.protocol}://${req.get("host")}/${filename}`;

    const user = await User.findByIdAndUpdate(req.user.id, {
      avatar: { public_id: filename, url: fileUrl },
    });

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// update user addresses
const handleUpdateAddresses = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === req.body.addressType,
    );

    if (sameTypeAddress) {
      return next(
        new ErrorHandler(
          `${req.body.addressType} address type already exists`,
          400,
        ),
      );
    }

    const existsAddress = user.addresses.find(
      (address) => address._id === req.body._id,
    );

    if (existsAddress) {
      // update addresss
      Object.assign(existsAddress, req.body);
    } else {
      // add address
      user.addresses.push(req.body);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// delete user address
const handleDeleteAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } },
    );

    const user = await User.findById(userId);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// update user password
const handleUpdatePassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched)
      return next(new ErrorHandler("Old Password is Incorrect!", 400));

    if (req.body.newPassword !== req.body.confirmPassword)
      return next(new ErrorHandler("Password doesnt match!", 400));

    user.password = req.body.newPassword;

    await user.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error)
    return next(new ErrorHandler(error, 500));
  }
});

module.exports = {
  handleCreateUser,
  handleActivateUser,
  handleUserLogin,
  handleUpdateUserInfo,
  handleUpdateAvatar,
  handleUpdateAddresses,
  handleDeleteAddress,
  handleUpdatePassword,
};
