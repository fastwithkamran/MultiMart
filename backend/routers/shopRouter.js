const { Router } = require("express");
const router = Router();
const { upload } = require("../multer.js");
const { isAuthenticatedSeller } = require("../utils/auth.js");
const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const {
  handleCreateShop,
  handleActivateShop,
  handleShopLogin,
} = require("../controllers/shop");

// Authentication
router.post("/create-shop", upload.single("file"), handleCreateShop);
router.post("/activation", handleActivateShop);
router.post("/login", handleShopLogin);

// Fetch the user Information
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

module.exports = router;
