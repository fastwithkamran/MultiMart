const { Router } = require("express");
const router = Router();
const { upload } = require("../multer.js");
const {
  handleCreateUser,
  handleActivateUser,
  handleUserLogin,
  handleUpdateUserInfo,
  handleUpdateAvatar,
  handleUpdateAddresses,
  handleDeleteAddress,
  handleUpdatePassword,
  handleGetUserInfo,
} = require("../controllers/user");
const { isAuthenticatedUser } = require("../utils/auth.js");
const catchAsyncErrors = require("../utils/catchAsyncErrors.js");

// Authentication
router.post("/create-user", upload.single("file"), handleCreateUser);
router.post("/activation", handleActivateUser);
router.post("/login", handleUserLogin);

// Fetch the user Information
router.get(
  "/getuser",
  isAuthenticatedUser,
  catchAsyncErrors((req, res) => {
    try {
      const user = req.user;
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }),
);

// Find user information with userID
router.get("/user-info/:id", handleGetUserInfo);

// Update user information
router.post("/update-user-info", isAuthenticatedUser, handleUpdateUserInfo);

// update the user avatar
router.put(
  "/update-avatar",
  isAuthenticatedUser,
  upload.single("image"),
  handleUpdateAvatar,
);

// update user addressses
router.put(
  "/update-user-addresses",
  isAuthenticatedUser,
  handleUpdateAddresses,
);

// delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticatedUser,
  handleDeleteAddress,
);

// update user password
router.put("/update-user-password", isAuthenticatedUser, handleUpdatePassword);

// Logout
router.get(
  "/logout",
  isAuthenticatedUser,
  catchAsyncErrors(async (req, res) => {
    try {
      res.cookie("Usertoken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.status(200).json({
        success: true,
        message: "Log Out Successful",
      });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }),
);

module.exports = router;
