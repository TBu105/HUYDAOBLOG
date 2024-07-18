const multer = require("multer");
const fs = require("fs");

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

const uploadFileMulter = (req, res, fieldName) => {
  return new Promise((resolve, reject) => {
    const multerMiddleware = upload.single(fieldName);
    multerMiddleware(req, res, (err) => {
      if (err) {
        return reject({ status: 400, message: "Failed to upload image" });
      }
      if (!req.file) {
        return reject({ status: 400, message: "No file uploaded" });
      }
      resolve(req.file);
    });
  });
};

const uploadFilesMulter = (req, res, fieldName, maxCount) => {
  return new Promise((resolve, reject) => {
    const multerMiddleware = upload.array(fieldName, maxCount);
    multerMiddleware(req, res, (err) => {
      if (err) {
        return reject({ status: 400, message: "Failed to upload images" });
      }
      if (!req.files || req.files.length === 0) {
        return reject({ status: 400, message: "No files uploaded" });
      }
      resolve(req.files);
    });
  });
};

// Function to delete a file from the upload folder
const deleteUploadFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
};

module.exports = {
  uploadFileMulter,
  uploadFilesMulter,
  deleteUploadFile,
};
