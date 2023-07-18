const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinaryRemix.util");

exports.productUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "shopbee/products",
    },
  }),
});
