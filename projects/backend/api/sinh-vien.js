const SinhVienModel = require("../models/sinh-vien.model");
const { async } = require("rxjs");
const LopHocModel = require("../models/LopHoc.model");

setSinhVien = (req) => {
  return {
    maSinhVien: req.maSinhVien,
    ho: req.ho,
    ten: req.ten,
    gioiTinh: req.gioiTinh,
    ngaySinh: req.ngaySinh,
    maLopHoc: req.maLopHoc,
    nguoiTao: req.nguoiTao,
    nguoiChinhSua: req.nguoiChinhSua,
  };
};
setSinhVienUpdate = (req) => {
  return {
    CMND: req.CMND,
    ho: req.ho,
    ten: req.ten,
    gioiTinh: req.gioiTinh,
    ngaySinh: req.ngaySinh,
    nguoiChinhSua: req.nguoiChinhSua,
    diaChiThuongTru: req.diaChiThuongTru,
    diaChiTamTru: req.diaChiTamTru,
    sdt: req.sdt,
    email: req.email,
    hoTenCha: req.hoTenCha,
    hoTenMe: req.hoTenMe,
    sdtCha: req.sdtCha,
    sdtMe: req.sdtMe,
  };
};
exports.layTatCaSinhVien = async (req, res) => {
  try {
    const sinhViens = await SinhVienModel.find({ trangThai: "1" });
    res.json(sinhViens);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Máy chủ không sữ lý được", error: error, status: 500 });
  }
};
exports.Laysinhvientheomalop= async(req,res)=>
{
  console.log(req.params)
  try {
    const sinhViens = await SinhVienModel.find({
      maLopHoc: req.params.maLopHoc,
    });
    res.json(sinhViens);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Máy chủ không sữ lý được", error: error, status: 500 });
  }
};
exports.themSinhVien = async (req, res) => {
  try {
    const sinhViens = await SinhVienModel.create(setSinhVien(req.body));
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

    if (findSinhVien == 0) {
      res.status(404).json({ message: "Không tìm thấy", status: 400 });
    }

    const sinhViens = await SinhVienModel.updateOne(
      { maSinhVien: req.body.maSinhVien },
      { $set: setSinhVienUpdate(req.body.data) }
    );
    const updateSV = await SinhVienModel.findOne({
      maSinhVien: req.body.maSinhVien,
    });
    console.log(sinhViens);
    if (sinhViens.nModified > 0) {
      res.status(200).json({
        data: setSinhVienUpdate(updateSV),
        message: "Cập nhật thành công",
        status: 200,
      });
    } else {
      res.status(200).json({
        message: "Cập nhật thành công, không có gì thay đổi",
        status: 200,
        data: setSinhVienUpdate(updateSV),
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Máy chủ không xữ lý được",
      errors: error,
      status: 500,
      data: null,
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
    res.json({ maLopHoc: req.params.maLopHoc, siSo: total });
  } catch (error) {
    res.json(error);
  }
};
