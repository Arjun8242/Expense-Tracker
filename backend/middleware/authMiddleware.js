const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../utils/logger");

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        logger.warn("❌ No token provided in headers");
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        logger.info("✅ Decoded token:", decoded);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            logger.warn("❌ User not found for token id:", decoded.id);
            return res.status(401).json({ message: "Not authorized, user not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        logger.error("❌ Error verifying token:", error.message);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};
