const { Router } = require("express");
const router = Router();

const catchAsyncErrors = require("../utils/catchAsyncErrors");

const handleStripePayment = require("../controllers/payment");

router.post("/process", handleStripePayment);

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  }),
);

module.exports = router;
