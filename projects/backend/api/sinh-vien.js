const SinhVienModel = require("../models/sinh-vien.model");
const settingModel = require("../models/setting.model");
const lopHocPhan = require("../models/LopHocPhan.model");
const diemSV = require("../models/diemsinhvien.model");
const { check, validationResult } = require("express-validator");
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
    email: req.maSinhVien + "@caothang.edu.vn",
    matKhau: req.matKhau,
    tenLopHoc: req.tenLopHoc,
  };
};
setSinhVienUpdate = (req, sv) => {
  return {
    maLopHoc: req.maLopHoc ? req.maLopHoc : sv.maLopHoc,
    CMND: req.CMND ? req.CMND : sv.CMND,
    ho: req.ho ? req.ho : sv.ho,
    ten: req.ten ? req.ten : sv.ten,
    gioiTinh: req.gioiTinh ? req.gioiTinh : sv.gioiTinh,
    ngaySinh: req.ngaySinh ? req.ngaySinh : sv.ngaySinh,
    nguoiChinhSua: req.nguoiChinhSua ? req.nguoiChinhSua : sv.nguoiChinhSua,
    diaChiThuongTru: req.diaChiThuongTru
      ? req.diaChiThuongTru
      : sv.diaChiThuongTru,
    diaChiTamTru: req.diaChiTamTru ? req.diaChiTamTru : sv.diaChiTamTru,
    sdt: req.sdt ? req.sdt : sv.sdt,
    email: req.email ? req.email : sv.email,
    hoTenCha: req.hoTenCha ? req.hoTenCha : sv.hoTenCha,
    hoTenMe: req.hoTenMe ? req.hoTenMe : sv.hoTenMe,
    sdtCha: req.sdtCha ? req.sdtCha : sv.sdtCha,
    sdtMe: req.sdtMe ? req.sdtMe : sv.sdtMe,
    ngayChinhSua: req.ngayChinhSua
      ? new Date(req.ngayChinhSua).toISOString()
      : Date.now(),
  };
};
setSinhVien_SV = (req) => {
  return {
    nguoiChinhSua: req.maSinhVien,
    sdt: req.sdt,
    ngayChinhSua: Date.now(),
  };
};
exports.layTatCaSinhVien = async (req, res) => {
  try {
    const sinhViens = await SinhVienModel.find({ trangThai: "1" });
    res.json(sinhViens);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Máy chủ không xử lý được", error: error, status: 500 });
  }
};

exports.Laysinhvientheomalop = async (req, res) => {
  try {
    const sinhViens = await SinhVienModel.find({
      maLopHoc: req.params.maLopHoc,
    });
    res.json(sinhViens);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Máy chủ không xử lý được", error: error, status: 500 });
  }
};

exports.themSinhVien = async (req, res, next) => {
  try {
    let dsSinhVien = req.body;
    let dsSinhVienThatBai = [];
    let dsSinhVienThanhCong = [];
    dsSinhVien.forEach(async (sv) => {
      const matkhau = await settingModel.findOne();
      sv.matKhau = matkhau.matKhauSinhVien;
      const sv_exist = await SinhVienModel.findOne({
        maSinhVien: sv.maSinhVien,
      });

      if (sv_exist) {
        const lopHoc = await LopHocModel.findOne({
          maLopHoc: sv_exist.maLopHoc,
        });

        if (lopHoc) {
          sv_exist.tenLopHoc = lopHoc.tenVietTat;
        }
        dsSinhVienThatBai.push({
          data: setSinhVien(sv_exist),
          message:
            "Sinh viên có mã " +
            sv_exist.maSinhVien +
            " đã tồn tại trong lớp " +
            lopHoc.tenVietTat,
          status: 422,
        });
      }else{
        const sinhViens = await SinhVienModel.create(setSinhVien(sv));
        dsSinhVienThanhCong.push({
          data: setSinhVien(sinhViens),
          message:
            "Đã thêm thành công sinh viên có mã sinh viên: " +
            sinhViens.maSinhVien,
          status: 200,
        });
      }
      if(dsSinhVien.length == (dsSinhVienThanhCong.length + dsSinhVienThatBai.length)){
        res.json({
          soSinhVienThemThanhCong: dsSinhVienThanhCong.length,
          soSinhVienThemThatBai: dsSinhVienThatBai.length,
          dsSinhVienThanhCong: dsSinhVienThanhCong,
          dsSinhVienThatBai: dsSinhVienThatBai,
        });

      }

    });


  } catch (error) {
    res
      .status(500)
      .json({ message: "Máy chủ không sử lý được", error: error, status: 500 });
    next(error);
  }
};

// Lay thong tin sinh vien tu maSV
exports.layThongtinSinhVien = async (req, res) => {
  try {
    const sinhViens = await SinhVienModel.findOne({
      maSinhVien: req.params.maSV,
    });
    if (sinhViens === null) {
      return res.status(404).json({ message: "Không tìm thấy" });
    } else {
      return res
        .status(200)
        .json({ data: sinhViens, message: "Lấy thành công", status: 200 });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Máy chủ không xử lý được", error: error, status: 500 });
  }
};

exports.capNhatSinhVien = async (req, res) => {
  try {
    const findSinhVien = await SinhVienModel.findOne({
      maSinhVien: req.body.maSinhVien,
    });

    if (!findSinhVien) {
      return res.status(404).json({ message: "Không tìm thấy", status: 404 });
    }
    let sinhViens;
    //Xet quyen o day
    if (req.body.sdt) {
      if (!(req.body.sdt.length == 10) || isNaN(req.body.sdt)) {
        return res.status(403).json({
          message: "Số điện thoại không hợp lệ",
          status: 403,
        });
      }
    }
    if (req.body.role == "SV") {
      sinhViens = await SinhVienModel.updateOne(
        { maSinhVien: req.body.maSinhVien },
        { $set: setSinhVien_SV(req.body) }
      );
    } else if (req.body.role == "GV" || req.body.role == "admin") {
      sinhViens = await SinhVienModel.updateOne(
        { maSinhVien: req.body.maSinhVien },
        { $set: setSinhVienUpdate(req.body, findSinhVien) }
      );
    }
    //kiem tra thong tin duoc cap nhat
    const findSinhVienUpdate = await SinhVienModel.findOne({
      maSinhVien: req.body.maSinhVien,
    });
    if (sinhViens.nModified > 0) {
      return res.status(200).json({
        data: setSinhVienUpdate(findSinhVienUpdate),
        message:
          "Cập nhật thành công " +
          findSinhVienUpdate.ho +
          " " +
          findSinhVienUpdate.ten,
        status: 200,
      });
    } else {
      return res.status(200).json({
        message: "Cập nhật thành công, không có gì thay đổi",
        status: 200,
        data: setSinhVienUpdate(findSinhVienUpdate),
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Máy chủ không xử lý được",
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
    const total = await SinhVienModel.find({ maLopHoc: req.params.maLopHoc });
    const lophoc = await LopHocModel.findOne({ maLopHoc: req.params.maLopHoc });
    // const lopHoc = await LopHocModel.findOne({ maLopHoc: req.params.maLopHoc });
    res.json({
      maLopHoc: req.params.maLopHoc,
      siSo: total.length,
      data: lophoc,
    });
  } catch (error) {
    res.json(error);
  }
};

///lay thong tin sinh vien tu ma LOP hoc phan
exports.laySinhVienLopHocPhan = async (req, res) => {
  try {
    var lopHP = await lopHocPhan.find({
      maLopHocPhan: req.params.maLopHocPhan,
    });
    var sinhvien = await SinhVienModel.find();
    var diemSinhVien = await diemSV.find({
      maLopHocPhan: req.params.maLopHocPhan,
    });
    var data = [];
    lopHP.forEach(async (x) => {
      sinhvien.forEach(async (y) => {
        diemSinhVien.forEach(async (z) => {
          if (x.maLopHoc == y.maLopHoc) {
            if (y.maSinhVien == z.maSinhVien) {
              data.push({
                ho: y.ho,
                ten: y.ten,
                maSinhVien: y.maSinhVien,
                maLopHocPhan: z.maLopHocPhan,
                diem: z.diem,
              });
            }
          }
        });
      });
    });
    res.json(data);
  } catch (error) {
    res.json({ error, status: 500 });
  }
};
exports.layDSLopHocPhan = async (req, res) => {
  try {
    const total = await SinhVienModel.find({ maLopHoc: req.params.maLopHoc });

    const dsLopHP_Update = await lopHocPhan.updateMany(
      { maLopHoc: req.params.maLopHoc },
      { $set: { soLuongSV: total.length } }
    );
    const dsLopHP = await lopHocPhan.find({ maLopHoc: req.params.maLopHoc });

    res.json({
      count: dsLopHP.length,
      data: dsLopHP,
      message: "Cập nhật sỉ số thành công",
    });
  } catch (error) {
    res.json(error);
  }
};
exports.checkValidate = () => {
  return [
    check("sdt", "Số điện thoại phải 10 số").isLength({ max: 10, min: 10 }),
    check("sdt", "Số điện thoại trống").notEmpty(),
    check("sdt", "Số điện thoại phải là số").isNumeric(),
  ];
};
