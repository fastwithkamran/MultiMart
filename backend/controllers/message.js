const Message = require("../models/message.js");

const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const { uploadToCloudinary, deleteFromCloudinary } = require("../multer");

// create new messages
const handleCreateMessages = catchAsyncErrors(async (req, res, next) => {
  try {
    let images = [];

    if (req.files) {
      const files = req.files;

      images = await Promise.all(
        files.map(async (file) => {
          const result = await uploadToCloudinary(
            file.buffer,
            file.originalname,
          );

          return { public_id: result.public_id, url: result.secure_url };
        }),
      );
    }

    const message = await Message.create({
      conversationId: req.body.conversationId,
      text: req.body.text,
      sender: req.body.sender,
      images,
    });

    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error, 500));
  }
});

// get all messages
const handleGetMessages = catchAsyncErrors(async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error, 500));
  }
});

module.exports = {
  handleCreateMessages,
  handleGetMessages,
};
