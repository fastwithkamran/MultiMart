const Message = require("../models/message.js");

const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");

// create new messages
const handleCreateMessages = catchAsyncErrors(async (req, res, next) => {
  try {
    let images = [];
    if (req.files) {
      images = req.files.map((file, index) => {
        const imageName = file.filename;
        const imageUrl = `${req.protocol}://${req.get("host")}/${filename}`;

        return {
          public_id: imageName,
          url: imageUrl,
        };
      });
    }

    const message = await Message.create({
      conversationId: req.body.conversationId,
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

module.exports = {
  handleCreateMessages,
};
