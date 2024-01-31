require("dotenv").config({
    path: process.env.NODE_ENV === "production" ? ".env" : `.env.${process.env.NODE_ENV}`
});

const express = require("express");
const app = express();
const mongoose =require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./_routes/user");

mongoose.connect("mongodb+srv://"+process.env.DB_username+":"+process.env.DB_password+"@cluster0.1wcy188.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connexion à MongoDB réussie !"))
.catch(() => {
    console.log("Connexion à MongoDB échouée !");
    process.exit();
});


app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTION");
    next();
});

app.use(bodyParser.json());

app.use("/api/auth", userRoutes);

module.exports = app;

// compte test:
// test@test.comp
// izyudfgu584