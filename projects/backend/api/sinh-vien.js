const SinhVienModel = require("../models/sinh-vien.model");
const { async } = require("rxjs");
const LopHocModel = require("../models/LopHoc.model");

exports.layTatCaSinhVien = async (req,res) => {
  try {
    const sinhViens = await SinhVienModel.find({ trangThai: "1"});
    res.json(sinhViens);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Máy chủ không sữ lý được", error: error, status: 500 });
  }
};
exports.Laysinhvientheomalop= async(req,res)=>
{
<<<<<<< HEAD
  console.log(req.params)
=======
>>>>>>> 48e1195e2d5a2376092bcac7947d3ffed6ea278e
  try {
    const sinhViens = await SinhVienModel.find({ maLopHoc: req.params.maLopHoc});
    res.json(sinhViens);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Máy chủ không sữ lý được", error: error, status: 500 });
  }
};
exports.themSinhVien = async (req, res) => {
  try {
    const sinhViens = await SinhVienModel.create(setSinhVien(req));
    res.json(sinhViens);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Máy chủ không sữ lý được", error: error, status: 500 });
  }
};

// Lay thong tin sinh vien tu maSV
exports.layThongtinSinhVien = async (req, res) => {
  try {
    const sinhViens = await SinhVienModel.findOne({
      maSinhVien: req.params.maSV,
    });
    if (sinhViens === null) {
      res.status(404).json({ message: "Không tìm thấy" });
    } else {
      res
        .status(200)
        .json({ data: sinhViens, message: "Lấy thành công", status: 200 });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Máy chủ không sữ lý được", error: error, status: 500 });
  }
};

exports.capNhatSinhVien = async (req, res) => {
  try {
    const findSinhVien = await SinhVienModel.find({
      maSinhVien: req.body.maSinhVien,
    }).count();
    const updateSV = await SinhVienModel.findOne({
      maSinhVien: req.body.maSinhVien,
    });
    if (findSinhVien == 0) {
      res.status(404).json({ message: "Không tìm thấy", status: 400 });
    }

    const sinhViens = await SinhVienModel.updateOne(
      { maSinhVien: req.body.maSinhVien },
      { $set: setSinhVienUpdate(req.body.data) }
    );
    console.log(sinhViens);
    if (sinhViens.nModified > 0) {
      res.status(200).json({
        data: setSinhVienUpdate(updateSV),
        message: "Cập nhật thành công",
        status: 200,
      });
    } else {
      res.status(200).json("Cập nhật thành công, không có gì thay đổi");
    }
  } catch (error) {
    res.status(500).json({
      message: "Máy chủ không xữ lý được",
      errors: error,
      status: 500,
    });
  }
};
exports.removeAll = async (req, res) => {
  const removeKhoa = await SinhVienModel.remove({ trangThai: 1 });
  if (removeKhoa.deletedCount === 0) {
    res.json({ status: false, message: "Id nay khong ton tai" });
  } else {
    res.json({
      status: true,
      message: "Deleted  All successful",
    });
  }
};
exports.tinhTongSinhVien = async (req, res) => {
  try {
    const total = await SinhVienModel.count({ maLopHoc: req.params.maLopHoc });
    // const lopHoc = await LopHocModel.findOne({ maLopHoc: req.params.maLopHoc });
    res.json({ maLopHoc: req.params.maLopHoc , siSo: total });
  } catch (error) {
    res.json(error);
  }

};

