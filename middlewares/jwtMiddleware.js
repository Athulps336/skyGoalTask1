const jwt = require('jsonwebtoken');
const User = require('../models/userShema');
const jwtSecretKey = "thisIsTheSecretKey";

const jwtMiddleware = async (req, res, next) => {
    const token = req.headers.token; 
    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        if (!decoded || !decoded.email) {
            return res.status(401).json({ message: "Unauthorized Access: Invalid token format" });
        }
        const userData = await User.findOne({ email: decoded.email }); 
        if (!userData) {
            return res.status(401).json({ message: "Unauthorized Access: User not found" });
        }
        req.user = userData;
        next();
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Unauthorized Access: Invalid token" });
        }
        return res.status(500).json({ message: "Internal Server Error" }); 
    }
};

module.exports = jwtMiddleware;
