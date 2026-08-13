const { Router } = require("express");
const router = Router();
const { upload } = require("../multer");

const { isAuthenticatedSeller, isAuthenticatedUser } = require("../utils/auth");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

const {
  handleCreateConversations,
  handleGetConversations,
  handleUpdateLastMessage,
} = require("../controllers/conversation");

// create conversation
router.post("/create-new-conversation", handleCreateConversations);

// get seller conversations
router.get(
  "/get-all-seller-conversations/:id",
  isAuthenticatedSeller,
  handleGetConversations,
);

// get user conversations
router.get(
  "/get-all-user-conversations/:id",
  isAuthenticatedUser,
  handleGetConversations,
);

router.put("/update-last-message/:id", handleUpdateLastMessage);

module.exports = router;
