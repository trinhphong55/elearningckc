var express = require("express");
var _router = express.Router();
var multer = require("multer");
var path = require("path");
const BaiTapSinhVien = require("../models/BaiTapSinhVien.model");
const SINHVIEN = require("../models/sinh-vien.model");
const { combineLatest } = require("rxjs");
const router = require('express').Router();
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

_router.get("/:maLopHocPhan/lop-hoc-phan", async (req, res) => {
  try {
    const baiTaps = await BaiTap.find({ lopHocPhan: req.params.maLopHocPhan });
    res.json({
      count: baiTaps.length,
      data: baiTaps,
      message: "Lấy thành công danh sách bài tập",
      status: 200,
    });
  } catch (error) {
    res.json(error);
  }
});

///lAY DS BT SV
_router.get("/", async (req, res) => {
  try {
    const baiTap = await BaiTapSinhVien.find({ trangThai: 1 });
    res.json(baiTap);
  } catch (error) {
    res.json(error);
  }
})
///BT THEO MHP
_router.get("/:email/:maBaiTap/baitap", async (req, res) => {
  try {
    const baiTap = await BaiTapSinhVien.find({ email: req.params.email, maBaiTap: req.params.maBaiTap, trangThai: 1 });
    res.json(baiTap);
  } catch (error) {
    res.json(error);
  }
});

// Add BaiTap
_router.post("/", async (req, res) => {
  try {
    // console.log(req.body)
    const bt = new BaiTapSinhVien(req.body);
    var data = await bt.save();
    res.status(201).json({ data });
  } catch (error) {
    res.json(error)
  }
});

//xoa bt
_router.put('/:id/xoabaitap', async (req, res) => {
  try {
    var data = await BaiTapSinhVien.findByIdAndUpdate(req.params.id, { trangThai: 0 }, req.params.idoptions, req.params.id.callback)
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});
module.exports = _router;
