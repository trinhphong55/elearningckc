const router = require('express').Router();
const PhongHoc = require('../models/PhongHoc.model');


router.get('/laytatca', async (req, res) => {
  try {
    const data = await PhongHoc.find({}, {}, { sort: { 'created_at': -1 } }).exec();
    return res.json(data);
  } catch (error) {
    return res.json({ message: "Something so wrong" + message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await PhongHoc.find({ trangThai: 1}, {}, { sort: { 'tenPhongHoc': 1 } }).exec();
    return res.json(data);
  } catch (error) {
    return res.json({ message: "Something so wrong" + message });
  }
});

router.get('/getone/:maPhongHoc', async (req, res) => {
  const maPhongHoc = req.params.maPhongHoc;
  await PhongHoc.findOne({ maPhongHoc }).then(ph => {
    if (ph === null) {
      return res.status(404).json({
        message: "Khong co phong nao nhu vay",
        status: 404,
      })
    } else {
      return res.status(200).json(ph);
    }
  })
})


router.post('/them', async (req, res) => {
  let maPhongHoc = await getNextNumber();
  const { day, lau, ghiChu, tenPhongHoc } = req.body;

  let ph = new PhongHoc({ day, lau, ghiChu, tenPhongHoc, maPhongHoc });
  ph.save().then(() => {
    return res.status(200).json({
      status: 200,
      message: "added PhongHoc",
    })
  }).catch(err => {
    return res.json({
      message: "Ten phong hoc da ton tai " + err.code,
      status: 404,
    })
  })
});

router.put('/:maPhongHoc', async (req, res) => {
  // isExisted = await isExistedInKHDT(req.params.maMonHoc);
  // if (isExisted) {
  //   return res.json({  ==> Check ton tai trong lich phong hoc
  //     status: 401,
  //     message: "Mon hoc nay da co trong KHDT, khong duoc chinh sua de tranh sai sot",
  //   });
  // }
  const { maPhongHoc } = req.params;
  const { tenPhongHoc, day, lau, ghiChu } = req.body;
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

async function getNextNumber() {
  nextNum = 1;
  const phonghoc = await PhongHoc.findOne({}, {}, { sort: { 'created_at': -1 } }).exec();
  if (phonghoc !== null) {
    nextNum = phonghoc.maPhongHoc + 1;
  }
  return nextNum;
}

module.exports = router;
