const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/ecommerce")
    .then(() => console.log("Connected to MongoDB"));

const AppController = require("./controllers/AppController");
const ProductController = require("./controllers/ProductController");

const app = express();

app.listen(3030);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", AppController.index);

app.get("/products", ProductController.index);
app.post("/products", ProductController.create);
app.get("/products/:id", ProductController.show);
app.put("/products/:id", ProductController.update);
app.delete("/products/:id", ProductController.deleteProduct);

app.all("*", AppController.notFound);
