const express = require("express");
const router = express.Router();

const bookCtrl = require("../_controllers/book");

router.get("/", bookCtrl.getAllBooks);

module.exports = router;