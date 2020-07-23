const router = require('express').Router()

var TinTuc = require('../models/cntttintuc.model');

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
router.post('/taotintuc', (req, res) => {
  TinTuc.save(req.body, (err, data) => {
    if (err) {
      return next(err)
    }
    res.json(data)
  })
})

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

