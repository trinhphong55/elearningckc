const router = require('express').Router();
const LichPhongHoc = require('../models/LichPhongHoc.model');
const LopHoc = require("../models/LopHoc.model");


router.get('/laytatca', async (req, res) => {
  try {
    const data = await LichPhongHoc.find({}, {}, { sort: { 'created_at': -1 } }).exec();
    return res.json(data);
  } catch (error) {
    return res.json({ message: "Something so wrong" + message });
  }
});

router.get('/:maBac/:khoa', async (req, res) => {
  maBac = parseInt(req.params.maBac);
  khoa = req.params.khoa;
  dsLPH = [];
  lichHoc = [];

  dsLH = await getDSLopHoctheomaBacvaKhoa(maBac, khoa);
  if (dsLH.length === 0) {
    return res.json(dsLPH);
  }

  for (let i = 0; i < 52; i++) {
    lichHoc.push("");
  }

  await asyncForEach(dsLH, async (lh, index) => {
    await LichPhongHoc.findOne({ maLopHoc: lh.maLopHoc })
      .then(lph => {
        if (lph === null) {
          newlph = new LichPhongHoc({ maLopHoc: lh.maLopHoc, khoa, lichHoc, tenVietTat: lh.tenVietTat });
          dsLPH.push(newlph);
        } else {
          dsLPH.push(lph);
        }
      })
  })
  return res.json(dsLPH);
});

router.post('/them', async (req, res) => {

  function checkIfDuplicateExists(w) {
    return new Set(w).size !== w.length
  }
  // console.log(
  //   checkIfDuplicateExists(["a", "b", "c", "a"])
  //   // true
  // );
  // console.log(
  //   checkIfDuplicateExists(["a", "b", "c"]))

  return res.json('end');
  const { day, lau, ghiChu, tenLichPhongHoc } = req.body;

  let ph = new LichPhongHoc({ day, lau, ghiChu, tenLichPhongHoc, maLichPhongHoc });
  ph.save().then(() => {
    return res.status(200).json({
      status: 200,
      message: "added LichPhongHoc",
    })
  }).catch(err => {
    return res.json({
      message: "Ten phong hoc da ton tai " + err.code,
      status: 404,
    })
  })
});

router.put('/:maLichPhongHoc', async (req, res) => {
  // isExisted = await isExistedInKHDT(req.params.maMonHoc);
  // if (isExisted) {
  //   return res.json({  ==> Check ton tai trong lich phong hoc
  //     status: 401,
  //     message: "Mon hoc nay da co trong KHDT, khong duoc chinh sua de tranh sai sot",
  //   });
  // }
  const { maLichPhongHoc } = req.params;
  const { tenLichPhongHoc, day, lau, ghiChu } = req.body;
  await MonHoc.updateOne(
    { maMonHoc: maMonHoc },
    { $set: { tenMonHoc, tenVietTat, maLoaiMonHoc } }
  ).then(() => {
    return res.status(200).json({
      status: 200,
      message: "Cap nhat thanh cong",
    });
  }).catch(err => {
    return res.status(500).json({
      status: 500,
      message: err,
    })
  });
})

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}


async function getNextNumber() {
  nextNum = 1;
  const LichPhongHoc = await LichPhongHoc.findOne({}, {}, { sort: { 'ngayTao': -1 } }).exec();
  if (LichPhongHoc !== null) {
    nextNum = LichPhongHoc.maLichPhongHoc + 1;
  }
  return nextNum;
}

async function getDSLopHoctheomaBacvaKhoa(maBac, khoa) {
  try {
    const dsLH = await LopHoc.find({ maBac, khoa, trangThai: { $ne: 0 } }).exec();
    return dsLH;
  } catch (error) {
    return [];
  }
}

module.exports = router;
