var express = require("express");
var _router = express.Router();
var multer = require("multer");
var path = require("path");
const BaiTap = require("../models/BaiTap.model");
const BaiTapSinhVienModel = require("../models/BaiTapSinhVien.model");
var CHUDE = require("../models/chu-de.model");
var COTDIEM = require("../models/cotdiem-lophocphan.model");

const PATH = "./uploads/elearning/baitap";

var store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PATH);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.originalname);
  },
});

var upload = multer({ storage: store }).single("file");

_router.post("/uploads", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(501).json({ error: err });
    }
    //do all database record saving activity
    return res.json(req.file.filename);
  });
});

_router.post("/download", function (req, res, next) {
  filepath =
    path.join(__dirname, "../uploads/elearning/baitap") +
    "/" +
    req.body.filename;
  res.sendFile(filepath);
});
setBaiTap = (req) => {
  return {
    deadLine: req.deadLine,
    file: req.file,
    chuDe: req.chuDe,
    nguoiTao: req.nguoiTao,
    nguoiChinhSua: req.nguoiChinhSua,
    trangThai: req.trangThai,
    tieuDe: req.tieuDe,
    huongDan: req.huongDan,
    lopHocPhan: req.lopHocPhan,
    maBaiTap: req.maBaiTap,
    ngayChinhSua: req.ngayChinhSua,
    ngayTao: req.ngayTao,
    daNop: req.maBaiTap,
  };
};
_router.get("/:maLopHocPhan/lop-hoc-phan", async (req, res) => {
  try {
    let baitap = [];
    const baiTaps = await BaiTap.find({
      lopHocPhan: parseInt(req.params.maLopHocPhan),
    });
    baitap = await baiTaps.map(async (bt) => {
      let baiTapSinhVien = await BaiTapSinhVienModel.countDocuments({
        maBaiTap: bt.maBaiTap,
      });
      bt.daNop = baiTapSinhVien;
      return setBaiTap(bt);
    });
    const kq = await Promise.all(baitap);
    res.json({
      count: baiTaps.length,
      data: kq,
      message: "Lấy thành công danh sách bài tập",
      status: 200,
    });
  } catch (error) {
    res.json(error);
  }
});

_router.get("/:maBaiTap", async (req, res) => {
  try {
    const baiTaps = await BaiTap.findOne({
      maBaiTap: parseInt(req.params.maBaiTap),
    });
    res.json({
      id: req.params.maBaiTap,
      data: baiTaps,
      message: "Lấy thành công bài tập",
      status: 200,
    });
  } catch (error) {
    res.json(error);
  }
});

// Add BaiTap
_router.post("/", async (req, res) => {
  let baitap = req.body;
  let nextNumber = 1;
  //get NextNumber
  await BaiTap.findOne({}, {}, { sort: { ngayTao: -1 } })
    .exec()
    .then((bt) => {
      if (bt !== null) {
        nextNumber = bt.maBaiTap + 1;
      }
    });

  baitap.maBaiTap = nextNumber;
  const newBaiTap = new BaiTap(baitap);
  await newBaiTap
    .save()
    .then((bt) => {
      return res.status(200).json({
        status: 200,
        maDoiTuong: bt.maBaiTap,
        message: "Them thanh cong",
      });
    })
    .catch((err) => {
      return res.status(501).json({
        status: 501,
        message: err,
      });
    });
});
// lay all cua bai tap
_router.get("/baitap/ds", async (req, res) => {
  try {
    const baiTaps = await BaiTap.find({trangThai:1});
    res.json(baiTaps);
  } catch (error) {
    res.json(error);
  }
});
 ///danh sach bai tap 1 lop hoc phan
 _router.get("/danhsachbaitap/:maLopHocPhan", async (req, res) => {
   try {
    var chude= await CHUDE.find({maLopHocPhan:req.params.maLopHocPhan,trangThai:1});
    var baitap=await BaiTap.find({trangThai:1,lopHocPhan:req.params.maLopHocPhan});
    var cotdiem = await COTDIEM.find({trangThai:1,maLopHocPhan:req.params.maLopHocPhan});
    var data=[];
    chude.forEach(async x => {
      baitap.forEach(async y => {
        cotdiem.forEach(async z => {
          if(x.maChuDe==y.chuDe)
          {
            if(y.maBaiTap==z.maBaiTap)
            {

             data.push({tieuDe:y.tieuDe,tenChuDe:x.tenChuDe,cotDiem:z.tenCotDiem,maCotDiem:z.maCotDiem})
            }
          }
        });
      });
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(501).json({
      status: 501,
      message: err,
    });
  }
});
// lay all cua bai tap
_router.get("/baitap/ds", async (req, res) => {
  try {
    const baiTaps = await BaiTap.find({ trangThai: 1 });
    res.json(baiTaps);
  } catch (error) {
    res.json(error);
  }
});
module.exports = _router;
