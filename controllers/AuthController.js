const User = require("../models/User");
const Crypto = require("crypto-js");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const encrypted = Crypto.AES.encrypt(req.body.password, process.env.APP_SECRET).toString();

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encrypted
    });
    await user.save();
    
    return res.status(201).json({
        message: "User created successfully"
    });
};

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) {
        return res.status(401).json({
            message: "User not found"
        });
    }

    const decrypted = Crypto.AES.decrypt(user.password, process.env.APP_SECRET).toString(Crypto.enc.Utf8);
    if (decrypted !== password) {
        return res.status(401).json({
            message: "Invalid password"
        });
    }

    const token = jwt.sign({}, process.env.APP_SECRET);
    redisClient.set(token, user._id.toString());

    return res.status(200).json({
        token: token
    });
};


module.exports = {
    register,
    login
};