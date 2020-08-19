const mongoose = require('mongoose');

const MonHocSchema = new mongoose.Schema({
  maMonHoc: {
    unique: true,
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
    default: "",
  },
  maLoaiMonHoc: {
    type: String,
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

const MonHoc = mongoose.model('MonHoc', MonHocSchema, 'MonHoc');

module.exports = MonHoc;
