const router = require('express').Router()
const ttthBanner = require('../models/ttthbanner.model');
const multer = require('multer')

// get tin tuc
router.get('/ttthdanhsachbanner', async (req, res) => {
  ttthBanner.find((error, data) => {
    if (error) {
      return next(error)
    }
    res.json(data)
  })
})
// add tin tuc
router.post('/ttththemtintuc', (req, res) => {
  var tintuc = new ttthBanner({
    id_loaitintuc: req.body.id_loaitintuc,
    image: req.body.image,
    tentintuc: req.body.tentintuc,
    slug: req.body.slug,
    description: req.body.description,
    noidung: req.body.noidung,
    hienthi: req.body.hienthi,
    trangthai: req.body.trangthai,
    nguoitao: req.body.nguoitao,
    nguoisua: req.body.nguoisua,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  })
  tintuc.save((err, data) => {
    if (err) {
      return next(err)
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
    let filename = `${file.originalname}`;
    callback(null, filename);
  }
});
var upload = multer({
  storage: Storage
})
router.post('/uploads', upload.single('image'), function (req, res) {

  if (!req.file) {
    // console.log("No file is available!");
    return res.send({
      success: false
    });
  }
  // console.log('filename:  ' + req.file.filename);
  // console.log('File is available!');
  res.send({
    success: true,
  })
});
// sua tin tuc
router.post('/ttthsuatintuc', async (req, res) => {
  await ttthBanner.findOneAndUpdate({
    _id: req.body._id
  }, {
    id_loaitintuc: req.body.id_loaitintuc,
    image: req.body.image,
    tentintuc: req.body.tentintuc,
    slug: req.body.slug,
    description: req.body.description,
    noidung: req.body.noidung,
    hienthi: req.body.hienthi,
    trangthai: req.body.trangthai,
    nguoitao: req.body.nguoitao,
    nguoisua: req.body.nguoisua,
    updated_at: req.body.updated_at,
  });
})
// xoa tin tuc
router.post('/ttthxoatintuc', async (req, res) => {
  await ttthBanner.findOneAndUpdate({
    _id: req.body._id
  }, {
    trangthai: false
  });
})
module.exports = router
