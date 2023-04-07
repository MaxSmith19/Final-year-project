const path = require('path');
const multer = require('multer');
const GridFsStorage = require('gridfs-stream');
const crypto = require('crypto');
const { mongoose } = require('../config/db');

let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = GridFsStorage(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        '-' +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

module.exports = { upload };
