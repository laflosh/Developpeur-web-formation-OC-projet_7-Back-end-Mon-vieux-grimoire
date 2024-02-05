require("dotenv").config({
    path: process.env.NODE_ENV === "production" ? ".env" : `.env.${process.env.NODE_ENV}`
});

const express = require("express");
const app = express();
const mongoose =require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const userRoutes = require("./_routes/user");
const bookRouter = require("./_routes/book");
const db="mongodb+srv://"+process.env.DB_username+":"+process.env.DB_password+"@"+process.env.DB_cluster+"/"+process.env.DB_name+"?retryWrites=true&w=majority";
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connexion à MongoDB réussie !"))
.catch(() => {
    console.log("Connexion à MongoDB échouée !" + db); 
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

app.use("/api/books", bookRouter);

app.use("/booksImages", express.static(path.join(__dirname, "/_images/booksImages")))

module.exports = app;

// compte test:
// user1@test.com
// izyudfgu584

// user2@test.com
// dighfsiduhfisuof

// user3@test.com
// deshfisedg

// mentor@test.com
// fjsdijdopog