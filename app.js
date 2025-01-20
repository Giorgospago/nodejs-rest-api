require('dotenv').config();

const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const redis = require("./config/redis");

redis.connect();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"));

const AppController = require("./controllers/AppController");
const ProductController = require("./controllers/ProductController");
const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");

const Auth = require("./middlewares/Auth");

const app = express();

app.listen(3030);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", AppController.index);

app.post("/auth/register", AuthController.register);
app.post("/auth/login", AuthController.login);

app.get("/products", ProductController.index);
app.post("/products", ProductController.create);
app.get("/products/:id", ProductController.show);
app.put("/products/:id", ProductController.update);
app.delete("/products/:id", ProductController.deleteProduct);

app.use(Auth.authenticate, require("./routes/authenticated"));


app.all("*", AppController.notFound);
