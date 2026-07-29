const { Router } = require("express");
const router = Router();
const { upload } = require("../multer.js");
const { handleCreateShop, handleActivateShop } = require("../controllers/shop");

router.post("/create-shop", upload.single("file"), handleCreateShop);
router.post("/activation", handleActivateShop);

module.exports = router;
