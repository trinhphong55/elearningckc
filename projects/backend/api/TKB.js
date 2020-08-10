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
const MonHoc = require("../models/MonHoc.model");

router.get("/android/malophoc/:maLopHoc/hocki/:hocKi", async (req, res) => {
  const maLopHoc = req.params.maLopHoc;
  const hocKi = req.params.hocKi;

  let dsLHP = [];
  let tkb = [];
  let newTKB = [];
  let dsMonHoc = [];

  dsLHP = await LopHocPhan.find({ maLopHoc, hocKi, trangThai: { $ne: 0 } });
  if (dsLHP.length === 0) {
    return res.status(401).json({ message: "ma Lop Hoc khong ton tai", status: 401, data: []})
  }

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

  await TKB.findOne({ maLopHoc, hocKi }).then((yasuo) => {
    if (yasuo === null) {
      return res.json({ status: 401, data: [], message: "lop hoc nay chua co tkb" });
    } else {
      tkb = yasuo.data;
    }
  });
  await asyncForEach(tkb, async (tiet) => {
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

router.get("/androidv2/malophoc/:maLopHoc/hocki/:hocKi", async (req, res) => {
  const maLopHoc = req.params.maLopHoc;
  const hocKi = req.params.hocKi;

  let dsLHP = [];
  let tkb = [];
  let newTKB = [];
  let dsPhanTu = [];

  dsLHP = await LopHocPhan.find({ maLopHoc, hocKi, trangThai: { $ne: 0 } });
  if (dsLHP.length === 0) {
    return res.status(401).json({ message: "ma Lop Hoc khong ton tai", status: 401, data: []})
  }
  console.log('tiep tuc');
  await asyncForEach(dsLHP, async (lhp, index) => {
    let phanTu = {};
    let maMonHoc = lhp.maDaoTao.slice(lhp.maDaoTao.length - 4);
    await MonHoc.findOne({ maMonHoc, trangThai: { $ne: 0 } })
      .then(mh => {
        phanTu.maMonHoc = mh.maMonHoc;
        phanTu.tenMonHoc = mh.tenMonHoc;
        phanTu.LoaiMonHoc = mh.maLoaiMonHoc;
      })
    let maGiaoVien = "null";
    let tenGiaoVien = "null"
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
    phanTu.tenGiaoVien = tenGiaoVien;
    dsPhanTu.push(phanTu);
  });

  await TKB.findOne({ maLopHoc, hocKi }).then((yasuo) => {
    if (yasuo === null) {
      return res.json({ status: 401, data: [], message: "lop hoc nay chua co tkb" });
    } else {
      tkb = yasuo.data;
    }
  });

  await asyncForEach(tkb, async (tiet) => {
    let temp = [];
    await asyncForEach(tiet, async (thu) => {
      if (thu !== "") {
        let tmpPhanTu = dsPhanTu.find(pt => pt.maMonHoc === thu);
        temp.push(tmpPhanTu);
      } else {
        temp.push({});
      }
    })
    newTKB.push(temp);
  })
  return res.status(200).json({
    message: 'Thanh cong',
    status: 200,
    data: newTKB,
  });
});

module.exports = router;
