const express = require("express");
const router = express.Router();
const auth = require("../_middlewares/auth");
const multer = require("../_middlewares/multer-config");

const bookCtrl = require("../_controllers/book");
const { path } = require("../_app");

router.get("/", bookCtrl.getAllBooks);

router.get("/bestrating", bookCtrl.getBestRating);

router.get("/:id", bookCtrl.getOneBook);

router.post("/", auth , multer, bookCtrl.createBook);

router.put("/:id", auth , multer,  bookCtrl.modifyBook);

module.exports = router;

