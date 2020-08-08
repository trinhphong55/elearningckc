const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// "_id": {
//   "$oid": "5efe0fb6f30afb6ea1ceeaf4"
// },
// "maSinhVien": "mã Bậc + Mã Ngành + Khoá Học + mã Loại Hình Đào Tạo + Số thứ tự",
// "CMND": "kiểu String",
// "ho": "kiểu String",
// "ten": "kiểu String",
// "gioiTinh": "kiểu Int",
// "ngaySinh": "kiểu String",
// "diaChiThuongTru": "kiểu String",
// "diaChiTamTru": "kiểu String",
// "sdt": "kiểu String",
// "email": "kiểu String",
// "matKhau": "kiểu String",
// "tokens": [
//   {
//       "token": "kiểu String"
//   }
// ],
// "hoTenCha": "kiểu String",
// "hoTenMe": "kiểu String",
// "sdtCha": "kiểu String",
// "sdtMe": "kiểu String",
// "maLopHoc": "mã trong bảng Lớp Học",
// "trangThai": "kiểu Int",
// "nguoiTao": "mã trong bảng Giáo Viên",
// "nguoiChinhSua": "mã trong bảng Giáo Viên",
// "ngayChinhSua": "kiểu DateTime"
const SinhVienSchema = new Schema({
  maSinhVien: {
    type: String,
    required: true,
    unique: true,
  },
  CMND: {
    type: String,
    required: true,
    default: "baomat",
  },
  ho: {
    type: String,

  },
  ten: {
    type: String,

  },
  gioiTinh: {
    type: String,

  },
  ngaySinh: {
    type: String,

  },
  diaChiThuongTru: {
    type: String,

    default: "baomat",
  },
  diaChiTamTru: {
    type: String,

    default: "baomat",
  },
  sdt: {
    type: String,

    default: "baomat",
  },
  email: {
    type: String,
    default: 'baomat',
  },
  matKhau: {
    type: String,
  },
  tokens: {
    type: String,

    default: "baomat",
  },
  hoTenCha: {
    type: String,

    default: "baomat",
  },
  hoTenMe: {
    type: String,

    default: "baomat",
  },
  sdtCha: {
    type: String,

    default: "baomat",
  },
  sdtMe: {
    type: String,

    default: "baomat",
  },
  maLopHoc: {
    type: String,

  },
  trangThai: {
    type: Number,

    default: 1,
  },
  nguoiTao: {
    type: String,

  },
  nguoiChinhSua: {
    type: String,

  },
  ngayChinhSua: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("SinhVien", SinhVienSchema, "SinhVien");
