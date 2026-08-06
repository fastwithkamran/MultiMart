const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handleStripePayment = catchAsyncErrors(async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: {
        company: "fastwithkamran",
      },
    });

    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    console.error(error)
    return next(new ErrorHandler(error, 500));
  }
});

module.exports = handleStripePayment;
