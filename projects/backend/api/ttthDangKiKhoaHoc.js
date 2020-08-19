const router = require('express').Router()
const ttthdangkilophoc = require('../models/ttthdangkilophoc.model');
const multer = require('multer')

// get
router.get('/', async (req, res) => {
  try {
    const danhsach = await ttthdangkilophoc.find({ trangthai: true }).sort({created_at: -1});
    res.json(danhsach);
  } catch (error) {
    res.json([]);
  }
})
// add
router.post('/add', (req, res,next) => {
  var add = new ttthdangkilophoc({
    mssv: req.body.mssv,
    hoten: req.body.hoten,
    ngaysinh: req.body.ngaysinh,
    noisinh: req.body.noisinh,
    sodienthoai: req.body.sodienthoai,
    lophoc: req.body.lophoc,
    hinhthuchoc: req.body.hinhthuchoc,
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
  await ttthdangkilophoc.findOneAndUpdate({
    _id: req.body._id
  }, {
    trangthai: false
  });
})
module.exports = router
