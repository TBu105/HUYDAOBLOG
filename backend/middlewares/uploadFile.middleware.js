const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const { uploadFileMulter, deleteUploadFile } = require("../utils/multerFile");

// Function to upload a single image
const uploadSingleImage = async (file) => {
  const filePath = file.path;
  const cloudImage = await cloudinary.uploader.upload(filePath, {
    resource_type: "image",
  });
  deleteUploadFile(filePath);
  return cloudImage.secure_url;
};

const uploadPostImage = async (req, res, next) => {
  try {
    const file = await uploadFileMulter(req, res, "photo");
    res.locals.photo = await uploadSingleImage(file);
    next();
  } catch (error) {
    return res.status(error.status || 500).send({
      error: error.message || "Failed to upload product images to Cloudinary",
    });
  }
};

module.exports = {
  uploadPostImage,
};
