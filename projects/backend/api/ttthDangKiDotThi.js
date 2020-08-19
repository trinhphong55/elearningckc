const router = require('express').Router()
const ttthdangkidotthi = require('../models/ttthdangkidotthi.model');
const multer = require('multer')

// get
router.get('/', async (req, res) => {
  try {
    const danhsach = await ttthdangkidotthi.find({ trangthai: true }).sort({created_at: -1});
    res.json(danhsach);
  } catch (error) {
    res.json([]);
  }
})
// add
router.post('/add', (req, res) => {
  var add = new ttthdangkidotthi({
    tendot: req.body.tendot,
    mssv: req.body.mssv,
    hoten: req.body.hoten,
    ngaysinh: req.body.ngaysinh,
    noisinh: req.body.noisinh,
    sodienthoai: req.body.sodienthoai,
    trangthai: req.body.trangthai,
    created_at: req.body.created_at,
  })
  add.save((err, data) => {
    if (err) {
      return next(err)
    }
    res.json(data)
  })
})
// xoa
router.post('/delete', async (req, res) => {
  await ttthdangkidotthi.findOneAndUpdate({
    _id: req.body._id
  }, {
    trangthai: false
  });
})
module.exports = router
