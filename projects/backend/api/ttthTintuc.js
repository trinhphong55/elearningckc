const router = require('express').Router()

const ttthtintuc = require('../models/ttthtintuc.model');

// get tin tuc
router.get('/ttthdanhsachtintuc', (req, res) => {
  ttthtintuc.find((error, data) => {
    if (error) {
      return next(error)
    }
    res.json(data)
  })
})
// add tin tuc
router.post('/ttththemtintuc', (req, res) => {
  var tintuc = new ttthtintuc({
    id_loaitintuc: req.body.id_loaitintuc,
    tentintuc: req.body.tentintuc,
    description: req.body.description,
    noidung: req.body.noidung,
    trangthai: true,
  })
  tintuc.save((err, data) => {
    if (err) {
      return next(err)
    }
    res.json(data)
  })
})
module.exports = router

