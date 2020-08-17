const cotdiemLophocphanModel = require("../models/cotdiem-lophocphan.model");
const BaiTap = require("../models/BaiTap.model");
const SINHVIEN = require("../models/sinh-vien.model");
const LOPHOCPHAN = require("../models/LopHocPhan.model");
const CHITIETDIEMSVLHP = require("../models/ct-diemsv-lhp.model")
const { data } = require("jquery");
const { findIndex } = require("rxjs/operators");
exports.layDiemLHP = async (req, res) => {
  try {
    const cotdiem = await cotdiemLophocphanModel.find();
    res.json(cotdiem);
  } catch (error) {
    res.json(error);
  }
};

exports.layDiemLHPtheoMaLHP = async (req, res) => {
  try {
    const cotdiem = await cotdiemLophocphanModel.find({
      maLopHocPhan: req.params.maLopHocPhan,
    });
    res.json({ data: cotdiem, count: cotdiem.length, maLopHocPhan: req.params.maLopHocPhan });
  } catch (error) {
    res.json(error);
  }
};
//lay cot diem theo ma lop hp trinh phong
exports.layCotDiemTheoMaLopHp = async (req, res) => {
  try {

    const cotdiem = await cotdiemLophocphanModel.find({ maLopHocPhan: req.params.maLopHocPhan, trangThai: 1 });
     
    return res.json(cotdiem);
  } catch (error) {
    res.json(error);
  }
};
exports.themCotDiem = async (req, res) => {
  try {
    var a = Number
    a = await  cotdiemLophocphanModel.countDocuments() + 1;
    var cotdiem = new cotdiemLophocphanModel({
      maLopHocPhan: req.body.maLopHocPhan,
      maGiaoVien: req.body.maGiaoVien,
      maCotDiem: a,
      tenCotDiem: req.body.tenCotDiem,
      heSo: req.body.heSo,
      tinhDiem: req.body.tinhDiem,
      maBaiTap: req.body.maBaiTap
    });
    var data = await cotdiem.save();
    if (data != null) {

      try {
        var lopHP = await LOPHOCPHAN.find({ maLopHocPhan: req.body.maLopHocPhan, trangThai: 1 });
        var sinhvien = await SINHVIEN.find({ trangThai: 1 });
        var ct;
        var beta;
        lopHP.forEach(async x => {
          sinhvien.forEach(async y => {
            if (x.maLopHoc == y.maLopHoc) {
              ct = new CHITIETDIEMSVLHP({
                maSinhVien: y.maSinhVien,
                maHocPhan: req.body.maLopHocPhan,
                maCotDiem: a,
                diem: 0,
                maChuDe: req.body.maBaiTap,
                nguoiTao: "admin",
                nguoiChinhSua: "admin",
                trangThai: 1
              })
              beta = await ct.save();
            }
          })
        })
      }
      catch (err) {
        return res.status(500).json({
          status: 500,
          message: err,
        })
      }
    }

    return res.status(200).json(data);

  }

  catch (err) {
    return res.status(500).json({
      status: 500,
      message: err,
    })
  }

};
exports.suaCotDiem = async (req, res) => {
  const { tenCotDiem, heSo, tinhDiem, maBaiTap } = req.body;
  await cotdiemLophocphanModel.updateOne(
    { maCotDiem: req.params.maCotDiem },
    { $set: { tenCotDiem, heSo, tinhDiem, maBaiTap} }
  ).then(() => {
    res.json({ status: "success" });
  }).catch(err => {
    res.json({ message: err });
  });
};

exports.layCotDiemTheoMaCotDiem = async (req, res) => {
  try {
    const cotdiem = await cotdiemLophocphanModel.find({ maCotDiem: req.params.maCotDiem,trangThai:1
    });
    res.json(cotdiem);
  } catch (error) {
    res.json(error);
  }
};