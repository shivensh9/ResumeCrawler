const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "resumes/"); // specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // unique filename
  },
});

// Initialize upload variable
const uploadResumeMiddleWare = multer({ storage: storage });

module.exports = { uploadResumeMiddleWare };
