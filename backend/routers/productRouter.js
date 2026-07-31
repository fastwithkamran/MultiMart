const { Router } = require("express");
const router = Router();
const { upload } = require("../multer");

const handleCreateProduct = require("../controllers/product");

router.post("/create-product", upload.array("images"), handleCreateProduct);

module.exports = router;
