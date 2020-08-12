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
var linkImg;
let Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, PATH);
  },
  filename: (req, file, callback) => {
    // const filename =`${Date.now()}${file.originalname}`
    const filename =`${file.originalname}`
    callback(null, filename);
  }
});
var upload = multer({
  storage: Storage
})
router.post('/uploads', upload.single('image'), function (req, res ,next) {
  if (!req.file) {
    return res.send({
      success: false
    });
  }
  res.send({
    success: true,
  });
});
// sua
router.post('/ttthsuathongtinweb', async (req, res) => {
  console.log(linkImg);
  await ttthThongTinWeb.findOneAndUpdate({
    _id: req.body._id
  }, {
    logo:req.body.logo,
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
