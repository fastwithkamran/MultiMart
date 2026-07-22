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

  sendToken(user, 201, res);
});

// login user
const handleUserLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Provide all fields"), 400);

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Password or Email"), 400);

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid)
    return next(new ErrorHandler("Incorrect Password or Email"), 400);

  sendToken(user, 201, res);
});

module.exports = { handleCreateUser, handleActivateUser, handleUserLogin };
