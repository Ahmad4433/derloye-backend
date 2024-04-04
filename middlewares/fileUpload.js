const multer = require("multer");

const fileUpload = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      const num = Math.floor(Math.random() * 1e9);
      cb(null, file.originalname + num + file.originalname);
    },
  });

  const upload = multer({ storage: storage });

  return upload;
};

module.exports = fileUpload;
