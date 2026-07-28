const { Router } = require("express");
const router = Router();
const path = require("path");
const { upload } = require("../multer.js");
const {
  handleCreateUser,
  handleActivateUser,
  handleUserLogin,
} = require("../controllers/user");
const { isAuthenticated } = require("../utils/auth.js");
const catchAsyncErrors = require("../utils/catchAsyncErrors.js");

// Authentication
router.post("/create-user", upload.single("file"), handleCreateUser);
router.post("/activation", handleActivateUser);
router.post("/login", handleUserLogin);

// Fetch the user Information
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors((req, res) => {
    const user = req.user;
    return res.status(200).json({
      success: true,
      user,
    });
  }),
);

// Logout
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(201).json({
      success: true,
      message: "Log Out Successful",
    });
  }),
);

module.exports = router;
