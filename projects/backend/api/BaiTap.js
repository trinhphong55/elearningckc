var express = require("express");
var _router = express.Router();
var multer = require("multer");
var path = require("path");
const BaiTap = require("../models/BaiTap.model");

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

_router.get("/", (req, res) => {
  res.status(200).json("ok");
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

module.exports = _router;
