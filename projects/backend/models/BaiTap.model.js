const mongoose = require('mongoose');

const BaiTapSchema = new mongoose.Schema({
  maBaiTap: {
    type: Number,
    required: true
  },
  lopHocPhan: {
    type: Number,
    required: true,
  },
  tieuDe: {
    type: String,
    trim: true,
  },
  huongDan: {
    type: String,
    trim: true,
  },
  deadLine: {
    type: String,
    default: "null",
  },
  file: {
    type: [],
    default: [],
  },
  chuDe: {
    type: Number,
    default: 1,
  },
  nguoiTao: {
    type: String,
    default: "Yasuo",
  },
  nguoiChinhSua: {
    type: String,
    default: "Lữ Cao Tiến",
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

const BaiTap = mongoose.model('BaiTap', BaiTapSchema, 'BaiTap');

module.exports = BaiTap;
