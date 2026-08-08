const Product = require("../models/product.js");
const Shop = require("../models/shop.js");
const Order = require("../models/order.js");

const catchAsyncErrors = require("../utils/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const fs = require("fs");

// create product
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

// delete product of a shop
const handleDeleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productData = await Product.findById(productId);

    if (!productData) {
      return next(new ErrorHandler("Product not found with this id", 400));
    }

    productData.images.forEach((imageUrl) => {
      const filename = new URL(imageUrl).pathname.split("/").pop();
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting images", err);
          return next(new ErrorHandler("Product Images cannot deleted", 500));
        }
      });
    });

    const product = await Product.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// get all events
const handleGetAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

// review for a product
const handleCreateProductReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const { user, ratings, comment, productId, orderId } = req.body;

    const review = { user, ratings, comment, productId };

    const product = await Product.findById(productId);

    product.reviews = product.reviews || [];

    const isReviewed = product.reviews.find((rev) => rev.user._id === user._id);

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user._id === req.user._id) {
          rev.ratings = ratings;
          rev.comment = comment;
          rev.user = user;
        }
      });
    } else {
      product.reviews.push(review);
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.ratings;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    await Order.findByIdAndUpdate(
      orderId,
      { $set: { "cart.$[elem].isReviewed": true } },
      { arrayFilters: [{ "elem._id": productId }], new: true },
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler(error, 500));
  }
});

module.exports = {
  handleCreateProduct,
  handleGetShopProducts,
  handleDeleteProduct,
  handleGetAllProducts,
  handleCreateProductReview,
};
