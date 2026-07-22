const User = require("../models/user.js");
const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const fs = require("fs");
const sendMail = require("../utils/sendMail.js");
const jwt = require("jsonwebtoken")

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
  const fileUrl = path.join(filename);
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: filename,
      url: fileUrl,
    },
  });

  const activationToken = createActivationToken(user.toObject());

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

module.exports = handleCreateUser;
