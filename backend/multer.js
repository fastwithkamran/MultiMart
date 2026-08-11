const multer = require("multer");
const path = require("path");

const cloudinaryModule = require("cloudinary");
const cloudinary = cloudinaryModule.v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "multi-vendor/images",

    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      const filename = path.basename(file.originalname, ext);

      return filename + "-" + uniqueSuffix;
    },
  },
});

exports.upload = multer({ storage: storage });
exports.cloudinary = cloudinary;
