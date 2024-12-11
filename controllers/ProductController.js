const Product = require('../models/Product');

// Είναι 3 βασικά Objects που μπορούμε να χρησιμοποιήσουμε για να πάρουμε δεδομένα από το request:
// req.query (Τα query parameters)
// req.body (Το body του request, όπως στο POST request)
// req.params (Τα route parameters, όπως το :id στο /products/:id)

const index = async (req, res) => {
    const products = await Product.find();
    return res.json({
        message: "List of products",
        products: products
    });
};

const create = (req, res) => {
    const slug = req.body.title
        .toLowerCase()
        .replace(/ /g, "-");

    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        slug: slug,
        image: req.body.image,
        price: req.body.price
    });

    product.save();

    return res.status(201).json({
        message: "Product created"
    });
};

const show = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.json({
            message: "Show one product",
            product: product
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

const update = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    return res.json({
        message: `Product: ${product.title} updated`
    });
};

const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.json({
        message: `Product: ${product.title} deleted`
    });
};


module.exports = {
    index,
    create,
    show,
    update,
    deleteProduct
};