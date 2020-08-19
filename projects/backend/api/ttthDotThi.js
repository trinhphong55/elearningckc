const router = require('express').Router()
const ttthdotthi = require('../models/ttthdotthi.model');
const multer = require('multer')

// get
router.get('/', async (req, res) => {
  try {
    const danhsach = await ttthdotthi.find({ trangthai: {$ne:0}}).sort({created_at: -1});
    res.json(danhsach);
  } catch (error) {
    res.json([]);
  }
})
router.get('/list', async (req, res) => {

  try {
    const danhsach = await ttthdotthi.find().sort({created_at: -1});
    res.json(danhsach);
  } catch (error) {
    res.json([]);
  }
})
// add
router.post('/add', (req, res) => {
  var add = new ttthdotthi({
    tendot: req.body.tendot,
    lophoc: req.body.lophoc,
    ngaythi: req.body.ngaythi,
    giothi: req.body.giothi,
    phongthi: req.body.phongthi,
    ngayhethan: req.body.ngayhethan,
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

// update
router.post('/update', async (req, res) => {
  await ttthdotthi.findOneAndUpdate({
    _id: req.body._id
  }, {
    tendot: req.body.tendot,
    lophoc: req.body.lophoc,
    ngaythi: req.body.ngaythi,
    giothi: req.body.giothi,
    phongthi: req.body.phongthi,
    ngayhethan: req.body.ngayhethan,
    trangthai: req.body.trangthai,
    nguoitao: req.body.nguoitao,
    nguoisua: req.body.nguoisua,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  });
})
// delete
router.post('/delete', async (req, res) => {
  await ttthdotthi.findOneAndUpdate({
    _id: req.body._id
  }, {
    nguoisua: req.body.nguoisua,
    trangthai: 0
  });
})
module.exports = router
