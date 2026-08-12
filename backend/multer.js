const cloudinary = require("cloudinary").v2;
const path = require("path");
const multer = require("multer");
const { Readable } = require("stream");

// pass env credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// save files in RAM as a buffer
const storage = multer.memoryStorage();
// use in routes multer put the images file in req.file.buffer
exports.upload = multer({ storage });

// upload to cloudinary
exports.uploadToCloudinary = (fileBuffer, originalname) => {
  return new Promise((resolve, reject) => {
    const ext = path.extname(originalname);
    const filename = path.basename(originalname, ext);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const public_id = `multi-vendor/images/${filename}-${uniqueSuffix}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id,
        transformation: [
          {
            fetch_format: "auto",
            quality: "auto",
          },
          {
            width: 1200,
            height: 1200,
            crop: "fill",
            gravity: "auto",
          },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    // convert the buffer to stream
    const readable = new Readable();
    readable.push(fileBuffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
};

// delete from cloudinary
exports.deleteFromCloudinary = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error("Cloudinary delete error", error);
  }
};
