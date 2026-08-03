const { Router } = require("express");
const router = Router();
const { upload } = require("../multer");

const {
  handleCreateProduct,
  handleGetShopProducts,
  handleDeleteProduct,
  handleGetAllProducts,
} = require("../controllers/product");

const { isAuthenticatedSeller } = require("../utils/auth");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

// create product
router.post("/create-product", upload.array("images"), handleCreateProduct);
// get products of a shop
router.get("/get-all-products-shop/:id", handleGetShopProducts);
// delete product
router.delete(
  "/delete-shop-product/:id",
  isAuthenticatedSeller,
  handleDeleteProduct,
);
// get all products
router.get("/get-all-products", handleGetAllProducts);

module.exports = router;
