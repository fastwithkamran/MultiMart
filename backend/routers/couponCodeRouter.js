const { Router } = require("express");
const router = Router();

const { isAuthenticatedSeller } = require("../utils/auth");

const {
  handleCreateCouponsCode,
  handleGetAllCoupons,
  handleGetCoupon,
  handleDeleteCoupon,
} = require("../controllers/couponCode");

router.post(
  "/create-coupon-code",
  isAuthenticatedSeller,
  handleCreateCouponsCode,
);

// get all coupons of a shop
router.get("/get-coupon/:id", isAuthenticatedSeller, handleGetAllCoupons);

// get coupon code value by its name
router.get("/get-coupon-value/:name", handleGetCoupon);

// delete coupon
router.delete("/delete-coupon/:id", isAuthenticatedSeller, handleDeleteCoupon);

module.exports = router;
