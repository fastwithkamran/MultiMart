const { Router } = require("express");
const router = Router();

const { isAuthenticatedSeller } = require("../utils/auth");

const handleCreateCouponsCode = require("../controllers/couponCode");

router.post(
  "/create-coupon-code",
  isAuthenticatedSeller,
  handleCreateCouponsCode,
);

module.exports = router;