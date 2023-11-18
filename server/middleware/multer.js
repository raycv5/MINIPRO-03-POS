const multer = require("multer");

module.exports = {
  multerUpload: () => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./public");
      },

      filename: (req, file, cb) => {
        cb(
          null,
          "PIMG" +
            "-" +
            Date.now() +
            Math.round(Math.random() * 10000) +
            "." +
            file.mimetype.split("/")[1]
        );
      },
    });

    const fileFilter = (req, file, cb) => {
      const exFilter = ["jpg", "jpeg", "png", "webp"];
      const checkExt = exFilter.includes(
        file.mimetype.split("/")[1].toLowerCase()
      );

      if (checkExt) {
        cb(null, true);
      } else {
        cb(new error("file format not match"));
      }
    };

    return multer({ storage, fileFilter });
  },
  productUpload: () => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./public");
      },

      filename: (req, file, cb) => {
        cb(
          null,
          "PRODUCT" +
            "-" +
            Date.now() +
            Math.round(Math.random() * 10000) +
            "." +
            file.mimetype.split("/")[1]
        );
      },
    });

    const fileFilter = (req, file, cb) => {
      const exFilter = ["jpg", "jpeg", "png", "webp"];
      const checkExt = exFilter.includes(
        file.mimetype.split("/")[1].toLowerCase()
      );

      if (checkExt) {
        cb(null, true);
      } else {
        cb(new error("file format not match"));
      }
    };

    return multer({ storage, fileFilter });
  },
};
