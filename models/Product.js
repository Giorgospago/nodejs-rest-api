const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    image: String,
    price: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true
});

const Product = mongoose.model("Product", schema);

module.exports = Product;