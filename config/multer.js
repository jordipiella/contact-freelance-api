const multer = require('multer');
const path = require('path');
require("dotenv").config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
       
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
        //cb(null, file.fieldname)
    }
});

const upload = multer({ storage: storage });
module.exports = upload;