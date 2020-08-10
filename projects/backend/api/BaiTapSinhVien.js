var express = require("express");
var _router = express.Router();
var multer = require("multer");
var path = require("path");
const BaiTapSinhVien = require("../models/BaiTapSinhVien.model");


const PATH = "./uploads/elearning/nopbaitap";

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

///lAY DS BT SV
_router.get("/", async (req, res) => {
  try {
    const baiTap = await BaiTapSinhVien.find({trangThai:1});
    res.json(baiTap);
  } catch (error) {
    res.json(error);
  }
})
///BT THEO MHP
_router.get("/:maSinhVien/:maBaiTap/baitap", async (req, res) => {
  try {
    const baiTap = await BaiTapSinhVien.find({maSinhVien:req.params.maSinhVien,maBaiTap:req.params.maBaiTap,trangThai:1});
    res.json(baiTap);
  } catch (error) {
    res.json(error);
  }
});

// Add BaiTap
_router.post("/", async (req, res) => {
  console.log(req.body)
  let baitap = req.body;
  let nextNumber = 1;
  //get NextNumber


    BaiTapSinhVien.maBaiTap = nextNumber;
  const newBaiTap = new BaiTapSinhVien(baitap);
  await newBaiTap
    .save()
    .then(() => {
      return res.status(200).json({ status: 200, message: "Them thanh cong" });
    })
    .catch((err) => {
      return res.status(501).json({
        status: 501,
        message: err,
      });
    });
});
//xoa bt
_router.put('/:id/xoabaitap', async (req, res) => {
  try {
    var data = await BaiTapSinhVien.findByIdAndUpdate(req.params.id, {trangThai: 0 }, req.params.idoptions, req.params.id.callback)
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});
module.exports = _router;
