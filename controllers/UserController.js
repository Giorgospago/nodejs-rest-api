
const me = async (req, res) => {
    return res.json({
        message: "ME",
        user: req.user
    });
};

const logout = async (req, res) => {
    redisClient.del(req.token);
    return res.json({
        message: "Logged out"
    });
};


module.exports = {
    me,
    logout
};