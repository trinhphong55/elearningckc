const mongoose = require('mongoose');

const MonHocSchema = new mongoose.Schema({
  maMonHoc: {
    type: String,
    required: true
  },
  tenMonHoc: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  tenVietTat: {
    type: String,
    trim: true,
  },
  loaiMonHoc: {
    type: String,
    trim: true,
  },
  tenTiengAnh: {
    type: String,
    trim: true,
  },
  tenVietTatTiengAnh: {
    type: String,
    trim: true,
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

const MonHoc = mongoose.model('MonHoc', MonHocSchema, 'MonHoc');

module.exports = MonHoc;
