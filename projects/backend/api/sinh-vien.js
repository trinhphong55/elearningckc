const SinhVienModel = require("../models/sinh-vien.model");
const sinhVienModel = require("../models/sinh-vien.model");

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

exports.layTatCaSinhVien = async (req, res) => {
  try {
    const sinhViens = await SinhVienModel.find();
    res.json(sinhViens);
  } catch (error) {
    res.status(500).json({ msg: "Máy chủ không sữ lý được", err: error });
  }
};

exports.themSinhVien = async (req, res) => {
  try {
    const sinhViens = await SinhVienModel.create(setSinhVien(req));
    res.json(sinhViens);
  } catch (error) {
    res.status(500).json({ msg: "Máy chủ không sữ lý được", err: error });
  }
};

// Lay thong tin sinh vien tu maSV
exports.layThongtinSinhVien = async (req, res) => {
  try {
    const sinhViens = await SinhVienModel.findOne({
      maSinhVien: req.params.maSV,
    });
    if (sinhViens === null) {
      res.status(404).json({ msg: "Không tìm thấy" });
    } else {
      res.status(200).json({data: sinhViens, message:'Lấy thành công'});
    }
  } catch (error) {
    res.status(500).json({ msg: "Máy chủ không sữ lý được", err: error });
  }
};

exports.capNhatSinhVien = async (req, res) => {
  try {
    const findSinhVien = await SinhVienModel.find({ maSinhVien: req.params.maSV}).count();
    if(findSinhVien == 0){
      res.status(404).json('Không tìm thấy');
    }
    const sinhViens = await SinhVienModel.updateOne(
      { maSinhVien: req.params.maSV },
      { $set: setSinhVien(req) }
    );
    console.log(sinhViens);
    if(sinhViens.nModified > 0){
      res.status(200).json({
        mssv: req.params.maSV,
        token:'chua co',
        data:req.body,
        msg:'Cập nhật thành công',
      });
    }
    else{
      res.status(200).json("Cập nhật thành công, không có gì thay đổi");
    }
  } catch (error) {
    res.status(500).json({ msg: "Máy chủ không sữ lý được", errors: error });
  }
};
exports.removeAll = async (req, res) => {
  const removeKhoa = await sinhVienModel.remove({ trangThai: 1 });
  if (removeKhoa.deletedCount === 0) {
    res.json({ status: false, msg: "Id nay khong ton tai" });
  } else {
    res.json({
      status: true,
      msg: "Deleted  All successful",
    });
  }
};
