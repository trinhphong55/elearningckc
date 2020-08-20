const router = require('express').Router()
const ttthCamOn = require('../models/ttthcamon.model');
const multer = require('multer')

// get
router.get('/', async (req, res) => {
  try {
    const danhsach = await ttthCamOn.find({ trangthai: true }).sort({created_at: -1}).limit(4);
    res.json(danhsach);
  } catch (error) {
    res.json([]);
  }
})
router.get('/list', async (req, res) => {
  try {
    const danhsach = await ttthCamOn.find().sort({created_at: -1});
    res.json(danhsach);
  } catch (error) {
    res.json([]);
  }
})
// add
router.post('/add', (req, res) => {
  var banner = new ttthCamOn({
    icon: req.body.icon,
    tieudechinh: req.body.tieudechinh,
    tieudephu: req.body.tieudephu,
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
  // console.log(banner);

})
// sua
router.post('/update', async (req, res) => {
  await ttthCamOn.findOneAndUpdate({
    _id: req.body._id
  }, {
    icon: req.body.icon,
    tieudechinh: req.body.tieudechinh,
    tieudephu: req.body.tieudephu,
    trangthai: req.body.trangthai,
    nguoisua: req.body.nguoisua,
    updated_at: req.body.updated_at,
  });
})
// xoa
router.post('/delete', async (req, res) => {
  await ttthCamOn.findOneAndUpdate({
    _id: req.body._id
  }, {
    trangthai: false,
    nguoisua: req.body.nguoisua,
  });
})
module.exports = router
