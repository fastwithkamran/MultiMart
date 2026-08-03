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
    const seller = req.seller;

    return res.status(200).json({
      success: true,
      seller,
    });
  }),
);

// Logout Seller
router.get(
  "/logout",
  isAuthenticatedSeller,
  catchAsyncErrors(async (req, res) => {
    res.cookie("Shoptoken", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "Log Out Successful",
    });
  }),
);

// Fetch the shop information on preview request
router.get("/get-shop-info/:id", handleGetShopInfo);

module.exports = router;
