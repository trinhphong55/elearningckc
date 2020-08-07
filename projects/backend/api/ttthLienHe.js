const router = require('express').Router()
const ttthlienhe = require('../models/ttthlienhe.model');
const multer = require('multer')

// get
router.get('/', async (req, res) => {
  try {
    const danhsach = await ttthlienhe.find({ trangthai: true }).sort({created_at: -1});
    res.json(danhsach);
  } catch (error) {
    res.json([]);
  }
})
// add
router.post('/add', (req, res) => {
  var add = new ttthlienhe({
    ten: req.body.ten,
    email: req.body.email,
    noidung: req.body.noidung,
    ngaygui: req.body.ngaygui,
    trangthai: req.body.trangthai
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
  await ttthlienhe.findOneAndUpdate({
    _id: req.body._id
  }, {
    trangthai: false
  });
})
module.exports = router
