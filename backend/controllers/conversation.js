const Conversation = require("../models/conversation.js");

const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");

// create new conversations
const handleCreateConversations = catchAsyncErrors(async (req, res, next) => {
  try {
    const { conversationTitle, userId, sellerId } = req.body;

    const conversationExist = await Conversation.findOne({ conversationTitle });

    if (conversationExist) {
      const conversation = conversationExist;

      return res.status(200).json({
        success: true,
        conversation,
      });
    }

    const conversation = await Conversation.create({
      conversationTitle: conversationTitle,
      members: [userId, sellerId],
    });

    return res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, error.statusCode || 500));
  }
});

// get conversations
const handleGetConversations = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      return res.status(200).json({
        success: true,
        conversations,
      });
    } catch (error) {
      console.error(error);
      return next(new ErrorHandler(error.message, error.statusCode || 500));
    }
  },
);

// update the last message
const handleUpdateLastMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    const { lastMessage, lastMessageId } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage,
      lastMessageId,
    });

    return res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error.message, error.statusCode || 500));
  }
});

module.exports = {
  handleCreateConversations,
  handleGetConversations,
  handleUpdateLastMessage,
};
