const Product = require("../models/product");
const Shop = require("../models/shop.js");

const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");

const handleCreateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop ID is invalid!", 400));
    } else {
      const files = req.files;
      const imageUrls = files.map(
        (file) => `${req.protocol}://${req.get("host")}/${file.filename}`,
      );
      const productData = req.body;
      productData.images = imageUrls;
      productData.shop = shop;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// get all products of a shop
const handleGetShopProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.id });
    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// delete product
const handleDeleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found with this id", 400));
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

module.exports = {
  handleCreateProduct,
  handleGetShopProducts,
  handleDeleteProduct,
};
