const express = require("express");
const router = express.Router();
const auth = require("../_middlewares/auth");
const multer = require("../_middlewares/multer");

const bookCtrl = require("../_controllers/book");

router.get("/", bookCtrl.getAllBooks);

router.get("/bestrating", bookCtrl.getBestRating);

router.get("/:id", bookCtrl.getOneBook);

router.post("/", auth , multer.upload.single("image"), bookCtrl.createBook);

router.post("/:id/rating", auth , bookCtrl.addBookRating);

router.put("/:id", auth , multer.upload.single("image"),  bookCtrl.modifyBook);

router.delete("/:id", auth , bookCtrl.deleteBook);

module.exports = router;

