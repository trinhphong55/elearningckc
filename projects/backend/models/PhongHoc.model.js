const mongoose = require('mongoose');

const PhongHocSchema = new mongoose.Schema({
  maPhongHoc: {
    unique: true,
    type: Number,
    required: true
  },
  tenPhongHoc: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  ghiChu: {
    type: String,
    trim: true,
    default: "",
  },
  day: {
    type: String,
    default: "F",
  },
  lau: {
    type: Number,
    default: 1,
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
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const PhongHoc = mongoose.model('PhongHoc', PhongHocSchema, 'PhongHoc');

module.exports = PhongHoc;
