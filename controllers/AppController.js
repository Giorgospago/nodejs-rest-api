

const index = (req, res) => {
    return res.json({
        message: "Welcome to NodeJS Rest API"
    });
};


const notFound = (req, res) => {
    return res.status(404).json({
        message: "Route not found"
    });
};


module.exports = {
    index,
    notFound
};