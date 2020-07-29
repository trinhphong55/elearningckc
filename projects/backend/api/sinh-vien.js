const SinhVienModel = require("../models/sinh-vien.model");

setSinhVien = (req) => {
  return {
    maSinhVien: req.body.maSinhVien,
    CMND: req.body.CMND,
    ho: req.body.ho,
    ten: req.body.ten,
    gioiTinh: req.body.gioiTinh,
    ngaySinh: new Date(req.body.ngaySinh),
    diaChiThuongTru: req.body.diaChiThuongTru,
    diaChiTamTru: req.body.diaChiTamTru,
    sdt: req.body.sdt,
    email: req.body.email,
    matKhau: req.body.matKhau,
    tokens: req.body.tokens,
    hoTenCha: req.body.hoTenCha,
    hoTenMe: req.body.hoTenMe,
    sdtCha: req.body.sdtCha,
    sdtMe: req.body.sdtMe,
    maLopHoc: req.body.maLopHoc,
    nguoiTao: req.body.nguoiTao,
    nguoiChinhSua: req.body.nguoiChinhSua,
    ngayChinhSua: Date.now(),
  };
};
setSinhVienUpdate = (req) => {
  return {
    CMND: req.CMND,
    ho: req.ho,
    ten: req.ten,
    gioiTinh: req.gioiTinh,
    ngaySinh: new Date(req.ngaySinh),
    diaChiThuongTru: req.diaChiThuongTru,
    diaChiTamTru: req.diaChiTamTru,
    sdt: req.sdt,
    email: req.email,
    hoTenCha: req.hoTenCha,
    hoTenMe: req.hoTenMe,
    sdtCha: req.sdtCha,
    sdtMe: req.sdtMe,
    nguoiChinhSua: req.nguoiChinhSua,
    ngayChinhSua: Date.now(),
  };
};
exports.layTatCaSinhVien = async (req, res) => {
  try {
    const sinhViens = await SinhVienModel.find();
    res.json(sinhViens);
  } catch (error) {
    res.status(500).json({ message: "Máy chủ không sữ lý được", error: error , status:500});
  }
};

exports.themSinhVien = async (req, res) => {
  try {
    const sinhViens = await SinhVienModel.create(setSinhVien(req));
    res.json(sinhViens);
  } catch (error) {
    res.status(500).json({ message: "Máy chủ không sữ lý được", error: error , status:500});
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
      res.status(200).json({ data: sinhViens, message: "Lấy thành công" });
    }
  } catch (error) {
    res.status(500).json({ message: "Máy chủ không sữ lý được", error: error, status:500 });
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
    res
      .status(500)
      .json({ message: "Máy chủ không xữ lý được", errors: error, status:500 });
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
