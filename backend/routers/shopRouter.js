const { Router } = require("express");
const router = Router();
const { upload } = require("../multer.js");
const { isAuthenticatedSeller } = require("../utils/auth.js");
const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const {
  handleCreateShop,
  handleActivateShop,
  handleShopLogin,
  handleGetShopInfo,
  handleUpdateShopAvatar,
  handleUpdateShopInfo,
} = require("../controllers/shop");

// Authentication
router.post("/create-shop", upload.single("file"), handleCreateShop);
router.post("/activation", handleActivateShop);
router.post("/login", handleShopLogin);

// Fetch the seller Information
router.get(
  "/getseller",
  isAuthenticatedSeller,
  catchAsyncErrors((req, res) => {
    try {
      const seller = req.seller;

      return res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  }),
);

// Logout Seller
router.get(
  "/logout",
  isAuthenticatedSeller,
  catchAsyncErrors(async (req, res) => {
    try {
      res.cookie("Shoptoken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
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

// Fetch the shop information on preview request
router.get("/get-shop-info/:id", handleGetShopInfo);

// update the user avatar
router.put(
  "/update-shop-avatar",
  isAuthenticatedSeller,
  upload.single("image"),
  handleUpdateShopAvatar,
);

router.put("/update-shop-info", isAuthenticatedSeller, handleUpdateShopInfo);

module.exports = router;
