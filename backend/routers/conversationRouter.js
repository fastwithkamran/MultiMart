const { Router } = require("express");
const router = Router();
const { upload } = require("../multer");

const { isAuthenticatedUser } = require("../utils/auth");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

const {
  handleCreateConversations,
  handleGetSellerConversations,
  handleUpdateLastMessage,
} = require("../controllers/conversation");

// create conversation
router.post("/create-new-conversation", handleCreateConversations);

// get seller conversations
router.get(
  "/get-all-seller-conversations/:sellerId",
  isAuthenticatedUser,
  handleGetSellerConversations,
);

router.put("/update-last-message/:id", handleUpdateLastMessage);

module.exports = router;
