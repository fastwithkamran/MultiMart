const Shop = require("../models/shop.js");
const Event = require("../models/event.js");

const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");

const handleCreateEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop ID is invalid!", 400));
    } else {
      const files = req.files;
      const imageUrls = files.map(
        (file) => `${req.protocol}://${req.get("host")}/${file.filename}`,
      );
      const eventData = req.body;
      eventData.images = imageUrls;
      eventData.shop = shop;

      const event = await Event.create(eventData);

      res.status(201).json({
        success: true,
        event,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

module.exports = handleCreateEvent;
