const router = require('express').Router()
const ttthThongTinWeb = require('../models/ttththongtinweb.model');
const multer = require('multer')

// get
router.get('/ttthdanhsachthongtinweb', async (req, res) => {
  ttthThongTinWeb.find((error, data) => {
    if (error) {
      return next(error)
    }
    res.json(data)
  })
})
// File upload settings

const PATH = './uploads/cntt';

let Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, PATH);
  },
  filename: (req, file, callback) => {
    let math = ["image/png", "image/jpeg"];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }
    let filename = 'uploads_' + `${file.originalname}`;
    callback(null, filename);
  }
});
var upload = multer({
  storage: Storage
})
router.post('/uploads', upload.single('image'), function (req, res) {

  if (!req.file) {
    return res.send({
      success: false
    });
  }
  res.send({
    success: true,
  })
});
// sua
router.post('/ttthsuathongtinweb', async (req, res) => {
  await ttthThongTinWeb.findOneAndUpdate({
    _id: req.body._id
  }, {
    logo: req.body.logo,
    diachi: req.body.diachi,
    giolamviec: req.body.giolamviec,
    hotline: req.body.hotline,
    email: req.body.email,
    copyright: req.body.copyright,
    mxh: req.body.mxh,
    nguoisua: req.body.nguoisua,
    updated_at: req.body.updated_at,
  });
})

module.exports = router
