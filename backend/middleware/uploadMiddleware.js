// uploadMiddleware.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // All files will go into a folder called "uploads"
    allowed_formats: ["jpeg", "png", "jpg", "gif"], // Allowed formats
  },
});

// Create multer instance
const upload = multer({ storage });

module.exports = upload;
