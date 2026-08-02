const { Router } = require("express");
const router = Router();

const { isAuthenticatedSeller } = require("../utils/auth");

const {
  handleCreateCouponsCode,
  handleGetAllCoupons,
  handleDeleteCoupon,
} = require("../controllers/couponCode");

router.post(
  "/create-coupon-code",
  isAuthenticatedSeller,
  handleCreateCouponsCode,
);

router.get("/get-coupon/:id", isAuthenticatedSeller, handleGetAllCoupons);

router.delete("/delete-coupon/:id", isAuthenticatedSeller, handleDeleteCoupon);

module.exports = router;
