const router = require('express').Router()
const TinTuc = require('../models/cntttintuc.model');
const multer = require('multer')
const PATH = './uploads';

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
// router.get('/', function (req, res) {
//   res.send('File catcher');
// });
var filename
router.post('/uploads', upload.single('image'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });
  }
    console.log('filename:   '+req.file.filename);
    filename = req.file.filename;
    console.log('File is available!');
    res.send({
      success: true,
      return:  filename
    })
});

router.post('/taotintuc', (req, res) => {
  var tintuc = new TinTuc({
    loaiBaiViet: req.body.loaiBaiViet,
    maDanhMuc: req.body.maDanhMuc,
    tieuDe: req.body.tieuDe,
    moTaNgan: req.body.moTaNgan,
    noiDung: req.body.noiDung,
    anhBia: './uploads/' + filename,
    thongBaoKhanCap: req.body.thongBaoKhanCap,
    trangThai: req.body.trangThai,
  })
  console.log(tintuc)
  tintuc.save((err, data) => {
    if (err) {
      return next(err)
    }
    res.json(data)
  })
})
// Get All Tintuc
router.get('/danhsachtintuc', (req, res) => {
  TinTuc.find((error, data) => {
    if (error) {
      return next(error)
    }
    res.json(data)
  })
})
// Get Tintuc by id
router.get('/tintuc/:id', (req, res) => {
  TinTuc.find(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    }
    res.json(data)
  })
})
// add Tintuc add


router.post('/xoatintuc/:id', (req, res, next) => {
  TinTuc.update({ _id: req.body._id }, { $set: { trangThai: 0 } }, (err, data) => {
    if (err) {
      console.log(err)
      return next(err)
    }
    console.log(ok)
    res.json(data)
  })

})

module.exports = router

