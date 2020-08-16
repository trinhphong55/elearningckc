const router = require('express').Router()
const ttthBanner = require('../models/ttthbanner.model');
const multer = require('multer')

// get tin tuc
router.get('/ttthdanhsachbanner', async (req, res) => {
  try {
    const danhsach = await ttthBanner.find({ trangthai: true }).sort({vitri : 1});
    res.json(danhsach);
  } catch (error) {
    res.json([]);
  }
})
router.get('/', async (req, res) => {
  try {
    const danhsach = await ttthBanner.find().sort({vitri : 1});
    res.json(danhsach);
  } catch (error) {
    res.json([]);
  }
})
// add
router.post('/ttththembanner', (req, res) => {
  var banner = new ttthBanner({
    image: req.body.image,
    link: req.body.link,
    vitri: req.body.vitri,
    hienthi: req.body.hienthi,
    trangthai: req.body.trangthai,
    nguoitao: req.body.nguoitao,
    nguoisua: req.body.nguoisua,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  })
  banner.save((err, data) => {
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
    let filename = 'slideshow_' +`${file.originalname}`;
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
router.post('/ttthsuabanner', async (req, res) => {
  await ttthBanner.findOneAndUpdate({
    _id: req.body._id
  }, {
    image: req.body.image,
    link: req.body.link,
    vitri: req.body.vitri,
    hienthi: req.body.hienthi,
    trangthai: req.body.trangthai,
    nguoitao: req.body.nguoitao,
    nguoisua: req.body.nguoisua,
    updated_at: req.body.updated_at,
  });
})
// xoa
router.post('/ttthxoabanner', async (req, res) => {
  await ttthBanner.findOneAndUpdate({
    _id: req.body._id
  }, {
    trangthai: false,
    nguoisua: req.body.nguoisua,
  });
})
module.exports = router
