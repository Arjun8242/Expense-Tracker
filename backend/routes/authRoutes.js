const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const logger = require("../utils/logger");

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");
const {authLimiter} = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.get("/getUser", protect, getUserInfo);
router.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Cloudinary gives full URL in req.file.path
    const imageUrl = req.file.path;

    res.status(200).json({ imageUrl });
  } catch (error) {
    logger.error("Image upload error:", error);
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
});

module.exports = router;
