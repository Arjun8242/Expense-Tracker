const rateLimit = require("express-rate-limit");

// ✅ Global limiter (API level)
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
  standardHeaders: true, // return rate limit info in headers
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// ✅ Auth limiter (stricter)
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // only 5 attempts
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
});
