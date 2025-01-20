const {createClient} = require("redis");

const connect = async () => {
    global.redisClient = await createClient({
        url: process.env.REDIS_URI
    })
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
    console.log("Connected to Redis");
};

module.exports = {
    connect
};