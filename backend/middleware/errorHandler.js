const logger = require("../utils/logger");

exports.errorHandler = (err, req, res, next) => {

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let details = err.details || null;

  // ✅ Mongo invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
    details = null;
  }

  // ✅ Mongo duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate value already exists";
    details = err.keyValue || null;
  }

   // ✅ CENTRALIZED ERROR LOG
  logger.error(message, {
    statusCode,
    details,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    message,
    details,
  });
};
