const router = require('express').Router()
const ttthdiemthi = require('../models/ttthdiemthi.model');
const multer = require('multer')
const ttthlophoc = require('../models/ttthlophoc.model');
const ttthdotthi = require('../models/ttthdotthi.model');

//IMPORT EXCEL
router.post('/importdiemthi', async (req, res) => {
  var items = req.body;
  if (items.length > 0) {
    ttthdiemthi.insertMany(items).then(() => {
    })
  } else {
    return res.json( {error: "Dữ liệu trống hoặc không đúng định dạng"})
  }
  if(!req.body[0].tendotthi){
    await ttthlophoc.findOneAndUpdate({
      tenlop: req.body[0].lop
    }, {
      trangthai: 2
    });
  }
  else{
    await ttthdotthi.findOneAndUpdate({
      _id: req.body[0].id
    }, {
      trangthai: 2
    });
  }
});
//tra cuu diem
router.get("/tracuudiem=:query", async (req, res) => {
  try {
    const newRegExp = (pattern) => new RegExp(`.*${pattern}.*`);
    const regexQuery = newRegExp(req.params.query);
    const data = await ttthdiemthi.find({
      mssv: { $regex: regexQuery, $options: "i" }, // i: không phân biệt chữ hoa & thường
      trangthai : true
    }).limit(1);
    res.json(data);
  } catch (error) {

  }
});
router.get("/tracuudiemtheosbd=:query", async (req, res) => {
  try {
    const newRegExp = (pattern) => new RegExp(`.*${pattern}.*`);
    const regexQuery = newRegExp(req.params.query);
    const data = await ttthdiemthi.find({
      sobaodanh: { $regex: regexQuery, $options: "i" }, // i: không phân biệt chữ hoa & thường
      trangthai : true
    }).limit(1);
    res.json(data);
  } catch (error) {

  }
});
// get
router.get('/', async (req, res) => {
  try {
    const danhsach = await ttthdiemthi.find({ trangthai: true }).sort({created_at: -1});
    res.json(danhsach);
  } catch (error) {
    res.json([]);
  }
});
router.get('/list', async (req, res) => {
  try {
    const danhsach = await ttthdiemthi.find().sort({created_at: -1});
    res.json(danhsach);
  } catch (error) {
    res.json([]);
  }
});
// update
router.post('/update', async (req, res) => {
  await ttthdiemthi.findOneAndUpdate({
    _id: req.body._id
  }, {
    hoten: req.body.hoten,
    mssv: req.body.mssv,
    ngaysinh: req.body.ngaysinh,
    sobaodanh: req.body.sobaodanh,
    noisinh: req.body.noisinh,
    lop: req.body.lop,
    tongdiem: req.body.tongdiem,
    xeploai: req.body.xeploai,
    ngaythi: req.body.ngaythi,
    giothi: req.body.giothi,
    phongthi: req.body.phongthi,
    laptrinhc: req.body.laptrinhc,
    msword: req.body.msword,
    msexcel: req.body.msexcel,
    mspowerpoint: req.body.mspowerpoint,
    trangthai: req.body.trangthai,
    nguoitao: req.body.nguoitao,
    nguoisua: req.body.nguoisua,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  });
})
// delete
router.post('/delete', async (req, res) => {
  await ttthdiemthi.findOneAndUpdate({
    _id: req.body._id
  }, {
    nguoisua: req.body.nguoisua,
    updated_at: req.body.updated_at,
    trangthai: false
  });
})
module.exports = router
