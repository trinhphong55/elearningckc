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

})
module.exports = router

