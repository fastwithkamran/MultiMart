const { Router } = require("express");
const router = Router();
const { upload } = require("../multer");

const { isAuthenticatedSeller } = require("../utils/auth");
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
  isAuthenticatedSeller,
  handleGetSellerConversations,
);

router.put("/update-last-message/:id", handleUpdateLastMessage);

module.exports = router;
