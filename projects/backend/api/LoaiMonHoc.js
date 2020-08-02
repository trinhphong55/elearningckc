const router = require('express').Router();
const LoaiMonHoc = require('../models/LoaiMonHoc.model');

//GET LoaiMonHoc
router.get('/', async (req, res) => {
  await LoaiMonHoc.find({ trangThai: { $gt: 0 } })
    .then(ds => {
      return res.json(ds);
    })
    .catch(err => {
      return res.json({message: err});
    })
})

router.post('/', async (req, res) => {
  dsLoaiMonHoc = [
    {tenLoaiMonHoc: "Lý thuyết", maLoaiMonHoc: "LT"},
    {tenLoaiMonHoc: "Thực hành", maLoaiMonHoc: "TH"},
    {tenLoaiMonHoc: "Module", maLoaiMonHoc: "MD"},
    {tenLoaiMonHoc: "Bài tập lớn", maLoaiMonHoc: "BT"},
    {tenLoaiMonHoc: "Đồ án", maLoaiMonHoc: "DA"},
    {tenLoaiMonHoc: "Thực hành tốt nghiệp", maLoaiMonHoc: "HN"},
  ];
  await LoaiMonHoc.insertMany(dsLoaiMonHoc)
    .then(ds => res.json(ds));
})

module.exports = router;
