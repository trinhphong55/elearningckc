const mongoose = require('mongoose');

const LopHocPhanSchema = new mongoose.Schema({
  maLopHocPhan: {
    type: Number,
    unique: true,
    required: true,
  },
  tenLopHocPhan: {
    type: String,
    required: true,
  },
  tenVietTatLopHocPhan: {
    type: String,
    default: "",
  },
  maLopHoc: {
    type: String,
    required: true,
  },
  maDaoTao: {
    type: String,
    required: true,
  },
  hocKi: {
    type: Number,
    required: true,
  },
  soLuongToiDa: {
    type: Number,
    default: 120,
  },
  soLuongSV: {
    type: Number,
    default: 0,
  },
  soLuongSVHocGhep: {
    type: Number,
    default: 0,
  },
  loaiLopHocPhan: {
    type: String,
    default: "Lớp Bình thường"
  },
  tinhTrangNopDiem: {
    type: Number,
    default: 0,
  },
  nguoiTao: {
    type: String,
    default: "Yasuo",
  },
  nguoiChinhSua: {
    type: String,
    default: "Yasuo",
  },
  ngayChinhSua: {
    type: Date,
    default: Date.now,
  },
  trangThai: {
    type: Number,
    default: 1,
  },
  ngayTao: {
    type: Date,
    default: Date.now,
  },


});

const LopHocPhan = mongoose.model('LopHocPhan', LopHocPhanSchema, 'LopHocPhan');

module.exports = LopHocPhan;
