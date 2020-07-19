const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoaiDonViSchema = new Schema({
  maLoaiDonVi: {
    type: Number,
    required: true,
    unique: true,
  },

  tenLoaiDonVi: {
    type: String,
    required: true,
  },
  //"kiểu String (Khoa | Bộ Môn | Phòng | Bộ Phận)"
  tenVietTat: {
    type: String,
    required: true,
  },
  //"kiểu String"
  nguoiTao: {
    type: String,
    required: true,
  },
  //"mã trong bảng Giáo Viên"
  nguoiChinhSua: {
    type: String,
    required: true,
  },
  //"mã trong bảng Giáo Viên"
  ngayChinhSua: {
    type: Date,
    default: Date.now,
  },
  //"kiểu DateTime"
  trangThai: {
    type: Number,
    default: 1,
  },
  //"kiểu Int"
});

module.exports = mongoose.model("LoaiDonVi", LoaiDonViSchema, "LoaiDonVi");
