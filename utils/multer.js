const multer = require('multer');
const path = require('path');

//multer config

const isSupportedImageExtension = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
};

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!isSupportedImageExtension(file.originalname)) {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});

upload.isSupportedImageExtension = isSupportedImageExtension;

module.exports = upload;
