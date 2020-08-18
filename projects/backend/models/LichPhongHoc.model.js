const mongoose = require('mongoose');

const LichPhongHocSchema = new mongoose.Schema({
  maLopHoc: {
    type: String,
    required: true,
  },
  tenVietTat: {
    type: String,
    default: "Lop no name",
  },
  lichHoc: {
    type: Array,
    default: [],
  },
  khoa: {
    type: Number,
    required: true,
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

const LichPhongHoc = mongoose.model('LichPhongHoc', LichPhongHocSchema, 'LichPhongHoc');

module.exports = LichPhongHoc;
