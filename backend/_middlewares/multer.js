const multer = require("multer");
const sharp = require("sharp");

const MIME_TYPES = {

    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp"

};

const storage = multer.memoryStorage()
module.exports.upload = multer({ storage})

module.exports.createImage = async (file) => {

    const extension = MIME_TYPES[file.mimetype];

    let name = file.originalname.replaceAll(" ", "_");
    name = name.substring(0, name.lastIndexOf('.'));
    name = name + "_" + Date.now() + "." + extension;

    await sharp(file.buffer)
    .webp({ quality: 20})
    .toFile("_images/booksImages/" + name);

    return name;

}