const router = require('express').Router()

const BaiViet = require('../models/cnttBaiViet.model');

// Get All Tintuc
router.get('/danhsachbaiviet', (req, res) => {
  BaiViet.find((error, data) => {
    if (error) {
      return next(error)
    }
    res.json(data)
  })
})
// Get Tintuc by id
router.get('/baiviet/:id', (req, res) => {
  BaiViet.find(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    }
    res.json(data)
  })
})
// add Tintuc add
router.post('/taobaiviet', (req, res) => {
  var baiViet = new BaiViet({
    loaiBaiViet: req.body.loaiBaiViet,
    maDanhMuc: req.body.maDanhMuc,
    tieuDe: req.body.tieuDe,
    moTaNgan: req.body.moTaNgan,
    noiDung: req.body.noiDung,
    trangThai: 1,
  })
  baiViet.save((err, data) => {
    if (err) {
      return next(err)
    }
    res.json(data)
  })
})

router.post('/xoabaiviet/:id', (req, res, next) => {
  BaiViet.update({ _id: req.body._id }, { $set: { trangThai: 0 } }, (err, data) => {
    if (err) {
      console.log(err)
      return next(err)
    }
    console.log(ok)
    res.json(data)
  })

})

module.exports = router
