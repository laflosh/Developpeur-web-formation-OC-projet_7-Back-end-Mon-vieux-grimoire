const multer = require("multer");

const MIME_TYPES = {

    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp"

};

const storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null, "_images/booksImages")
    },

    filename: (req, file, callback) => {

        let name = file.originalname.replaceAll(" ", "_");
        name = name.substring(0, name.lastIndexOf('.'));
        
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + "_" + Date.now() + "." + extension);
    }
});

module.exports = multer({ storage }).single("image");

