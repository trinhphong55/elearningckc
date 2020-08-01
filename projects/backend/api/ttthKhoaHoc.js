const router = require('express').Router()
const ttthkhoahoc = require('../models/ttthkhoahoc.model');
const multer = require('multer')

// get
router.get('/', async (req, res) => {

  try {
    const danhsach = await ttthkhoahoc.find({ trangthai: true });
    res.json(danhsach);
  } catch (error) {
    res.json([]);
  }
})
// add tin tuc
router.post('/add', (req, res) => {
  var add = new ttthkhoahoc({
    tenkhoahoc: req.body.tenkhoahoc,
    image: req.body.image,
    makhoahoc: req.body.makhoahoc,
    noidung: req.body.noidung,
    trangthai: req.body.trangthai,
    nguoitao: req.body.nguoitao,
    nguoisua: req.body.nguoisua,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  })
  add.save((err, data) => {
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
router.post('/update', async (req, res) => {
  await ttthkhoahoc.findOneAndUpdate({
    _id: req.body._id
  }, {
    tenkhoahoc: req.body.tenkhoahoc,
    image: req.body.image,
    makhoahoc: req.body.makhoahoc,
    noidung: req.body.noidung,
    trangthai: req.body.trangthai,
    nguoitao: req.body.nguoitao,
    nguoisua: req.body.nguoisua,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  });
})
// xoa tin tuc
router.post('/delete', async (req, res) => {
  await ttthkhoahoc.findOneAndUpdate({
    _id: req.body._id
  }, {
    trangthai: false
  });
})
module.exports = router
