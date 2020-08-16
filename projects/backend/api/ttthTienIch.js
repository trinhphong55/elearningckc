const router = require('express').Router()
const ttthTienIch = require('../models/ttthtienich.model');
const multer = require('multer')

// get
router.get('/', async (req, res) => {
  try {
    const danhsach = await ttthTienIch.find({ trangthai: true }).sort({created_at: -1});
    res.json(danhsach);
  } catch (error) {
    res.json([]);
  }
})
router.get('/list', async (req, res) => {
  try {
    const danhsach = await ttthTienIch.find().sort({created_at: -1});
    res.json(danhsach);
  } catch (error) {
    res.json([]);
  }
})
// add
router.post('/add', (req, res) => {
  var item = new ttthTienIch({
    ten: req.body.ten,
    mota: req.body.mota,
    image: req.body.image,
    link: req.body.link,
    trangthai: req.body.trangthai,
    nguoitao: req.body.nguoitao,
    nguoisua: req.body.nguoisua,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  })
  item.save((err, data) => {
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
    let filename = 'tienich_' +`${file.originalname}`;
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
router.post('/update', async (req, res) => {
  await ttthTienIch.findOneAndUpdate({
    _id: req.body._id
  }, {
    ten: req.body.ten,
    mota: req.body.mota,
    image: req.body.image,
    link: req.body.link,
    trangthai: req.body.trangthai,
    nguoitao: req.body.nguoitao,
    nguoisua: req.body.nguoisua,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  });
})
// xoa
router.post('/delete', async (req, res) => {
  await ttthTienIch.findOneAndUpdate({
    _id: req.body._id
  }, {
    nguoisua: req.body.nguoisua,
    trangthai: false
  });
})
module.exports = router
