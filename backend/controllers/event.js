const Shop = require("../models/shop.js");
const Event = require("../models/event.js");

const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const { uploadToCloudinary, deleteFromCloudinary } = require("../multer");

// create event
const handleCreateEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);

    let imageUrls = [];

    if (!shop) {
      return next(new ErrorHandler("Shop ID is invalid!", 400));
    } else {
      const files = req.files;
      imageUrls = await Promise.all(
        files.map(async (file) => {
          const result = await uploadToCloudinary(
            file.buffer,
            file.originalname,
          );

          return { public_id: result.public_id, url: result.secure_url };
        }),
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
    console.error(error);
    return next(new ErrorHandler(error, 500));
  }
});

// get all events of a shop
const handleGetShopEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find({ shopId: req.params.id });
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error, 500));
  }
});

// delete event of a shop
const handleDeleteEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const eventData = await Event.findById(eventId);

    if (!eventData) {
      return next(new ErrorHandler("Event not found with this id", 400));
    }

    for (const image of eventData.images) {
      const existImagePath = image.public_id;

      await deleteFromCloudinary(existImagePath);
    }

    const event = await Event.findByIdAndDelete(eventId);

    res.status(200).json({
      success: true,
      message: "Event Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error, 500));
  }
});

// get all events
const handleGetAllEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error, 500));
  }
});

module.exports = {
  handleCreateEvent,
  handleDeleteEvent,
  handleGetShopEvents,
  handleGetAllEvents,
};
