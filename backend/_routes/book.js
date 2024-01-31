const express = require("express");
const router = express.Router();
const auth = require("../_middlewares/auth");
const multer = require("../_middlewares/multer-config");

const bookCtrl = require("../_controllers/book");

router.get("/", bookCtrl.getAllBooks);

router.get("/:id", bookCtrl.getOneBook)

router.post("/",auth ,multer ,bookCtrl.createBook);

module.exports = router;