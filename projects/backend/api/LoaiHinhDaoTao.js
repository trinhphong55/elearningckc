const router = require('express').Router();
const LoaiHinhDaoTao = require('../models/LoaiHinhDaoTao.model');

//GET LHDT
router.get('/', async (req, res) => {
  await LoaiHinhDaoTao.find({ trangThai: { $gt: 0 } })
    .then(ds => {
      return res.json(ds);
    })
    .catch(err => {
      return res.json({message: err});
    })
})

module.exports = router;
