const { Router } = require("express");
const router = Router();
const { upload } = require("../multer");

const { isAuthenticatedSeller } = require("../utils/auth");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

const { handleCreateConversations } = require("../controllers/conversation");

// create conversation
router.post("/create-new-conversation", handleCreateConversations);

module.exports = router;
