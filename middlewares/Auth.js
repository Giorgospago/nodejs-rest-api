const jwt = require('jsonwebtoken');
const User = require("../models/User");

const authenticate = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    const token = auth.split(" ")[1];
    if (!token || token.length === 0) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    const decoded = jwt.verify(token, process.env.APP_SECRET);
    if (!decoded) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    const redisToken = await redisClient.get(token);
    if (!redisToken) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    const user = await User.findById(redisToken);
    if (!user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    req.user = user;
    req.token = token;
    next();
};

module.exports = {
    authenticate
};