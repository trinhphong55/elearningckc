const router = require("express").Router();
const TKB = require("../models/TKB.model");

const LopHocPhan = require('../models/LopHocPhan.model');
const KHDT = require('../models/KeHoachDaoTao.model');
const GVLHP = require('../models/GiaoVienLopHocPhan.model');
const GiaoVienDAO = require('../DAO/GiaoVienDAO');
const giaoVienDAO = new GiaoVienDAO();

const {
  asyncForEach
} = require('../utils/MonHoc.util');

router.get("/android/malophoc/:maLopHoc/hocki/:hocKi", async (req, res) => {
  const maLopHoc = req.params.maLopHoc;
  const hocKi = req.params.hocKi;

  let dsLHP;
  let item = [];
  let newTKB = [];
  let dsMonHoc = [];

  await LopHocPhan.find({ maLopHoc, hocKi, trangThai: { $ne: 0 } }).sort({ tenLopHocPhan: 1 }).then(ds => {
    if (ds.length !== 0) {
      dsLHP = ds;
    } else {
      return res.json({ status: 401, data: [], message: "lop hoc nay chua co tkb" });
    }
  });

  await asyncForEach(dsLHP, async (lhp, index) => {
    let maMonHoc = lhp.maDaoTao.slice(lhp.maDaoTao.length - 4);
    let tenMonHocVietTat = lhp.tenVietTatLopHocPhan.split("-")[1].trim();
    let maGiaoVien = "null";
    let DVHT = 0;
    let tenGiaoVien = "null"
    await KHDT.findOne({ maDaoTao: lhp.maDaoTao })
      .then(khdt => {
        DVHT = khdt.donViHocTrinh;
      });
    await GVLHP.findOne({ maLopHocPhan: lhp.maLopHocPhan, trangThai: { $ne: 0 } })
      .then(gvlhp => {
        if (gvlhp === null) {
          tenGiaoVien = "Chưa có GVLHP";
        } else {
          maGiaoVien = gvlhp.maGiaoVien;
        }
      });
    if (maGiaoVien !== "null") {
      await giaoVienDAO.layThongTinGiaoVien(maGiaoVien).then(gv => {
        tenGiaoVien = gv[0].ho + " " + gv[0].ten;
      })
    }
    let tenMonHoc = tenMonHocVietTat + " - " + tenGiaoVien;
    dsMonHoc.push({ maMonHoc, tenMonHoc });
  });

  await TKB.findOne({ maLopHoc, hocKi }).then((tkb) => {
    if (tkb === null) {
      return res.json({ status: 401, data: [], message: "lop hoc nay chua co tkb" });
    } else {
      item = tkb.data;
    }
  });
  await asyncForEach(item, async (tiet) => {
    let temp = [];
    await asyncForEach(tiet, async (thu) => {
      if (thu !== "") {
        tmpMonHoc = dsMonHoc.find(mh => mh.maMonHoc === thu)
        temp.push(tmpMonHoc.tenMonHoc);
      } else {
        temp.push("");
      }
    })
    newTKB.push(temp);
  })
  return res.json(newTKB);
});

router.get("/malophoc/:maLopHoc/hocki/:hocKi", async (req, res) => {
  const maLopHoc = req.params.maLopHoc;
  const arrayNull = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],

    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];

  if (maLopHoc === "null") {
    return res.json({ TKB: arrayNull, tuanBatDau: 1, tuanKetThuc: 20 });
  }
  const hocKi = req.params.hocKi;

  await TKB.findOne({ maLopHoc, hocKi }).then((tkb) => {
    if (tkb === null) {
      return res.json({ TKB: arrayNull, tuanBatDau: 1, tuanKetThuc: 20 });
    } else {
      return res.json({ TKB: tkb.data, tuanBatDau: tkb.tuanBatDau, tuanKetThuc: tkb.tuanKetThuc });
    }
  });
});

router.post("/", async (req, res) => {
  const { hocKi, maLopHoc, data, tuanBatDau, tuanKetThuc } = req.body;

  await TKB.findOneAndUpdate({ maLopHoc, hocKi }, { $set: { data, tuanBatDau, tuanKetThuc } }).then(
    result => {
      if (result !== null) {
        return res.json({
          status: 200,
          data: [],
          message: "Cap nhat thanh cong",
        });
      } else {
        const newTKB = new TKB({ hocKi, maLopHoc, data, tuanBatDau, tuanKetThuc });
        newTKB.save().then(() => {
          return res.json({
            status: 200,
            data: [],
            message: "Them moi thanh cong",
          });
        })
        .catch((err) => {
          return res.json({
            status: 500,
            data: err,
            message: "Internal Server Error",
          });
        });
      }
    }
  )
  .catch((err) => {
    return res.json({
      status: 500,
      data: err,
      message: "Internal Server Error",
    });
  });
});

module.exports = router;
