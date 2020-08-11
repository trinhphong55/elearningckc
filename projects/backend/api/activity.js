const router = require('express').Router();
const Activity = require('../models/activity.model');
const { json } = require('body-parser');

router.get('/', async (req, res) => {
  return res.status(200).json('Get activity');
})

router.get('/:loaiActivity/lophocphan/:maLopHocPhan', async (req, res) => {
  const loaiActivity = req.params.loaiActivity;
  const maLopHocPhan = req.params.maLopHocPhan;
  await Activity.find({ loaiActivity, maLopHocPhan })
    .then(dsActi => {
      return res.status(200).json({
        message: "Lay thanh cong",
        data: dsActi,
        status: 200,
      })
    }).catch(err => {
      return res.status(500).json({
        message: err,
        status: 500,
        data: [],
      })
    })
})


router.post('/them', async (req, res) => {
  // const { loaiActivity, role, maLopHocPhan, maDoiTuong, loaiDoiTuong, noiDung, nguoiThucHien } = req.body;

  newActivity = new Activity(req.body);
  newActivity.save().then(() => {
    return res.status(200).json({
      message: "add activity oke",
    })
  }).catch(err => {
    return res.status(500).json({
      message: err,
    })
  })
})

module.exports = router;