const User = require("../models/user.js");
const path = require("path");

const handleCreateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return next(new ErrorHandler("User already exits", 400));
  }

  const filename = req.file.filename;
  const fileUrl = path.join(filename);
  const user = {
    name,
    email,
    password,
    avatar: fileUrl,
  };
  console.log(user);
};

module.exports = handleCreateUser;
