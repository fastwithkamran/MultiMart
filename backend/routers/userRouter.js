const { Router } = require("express");
const router = Router();
const path = require("path");
const { upload } = require("../multer.js");
const handleCreateUser = require("../controllers/user");

router.post("/create-user", upload.single("file"), handleCreateUser);

module.exports = router;
