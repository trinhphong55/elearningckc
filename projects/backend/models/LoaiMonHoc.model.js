const mongoose = require('mongoose');

const LoaiMonHocSchema = new mongoose.Schema({
  maLoaiMonHoc: {
    type: String,
    unique: true,
    required: true
  },
  tenLoaiMonHoc: {
    type: String,
    required: true,
    unique: true,
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

const LoaiMonHoc = mongoose.model('LoaiMonHoc', LoaiMonHocSchema, 'LoaiMonHoc');

module.exports = LoaiMonHoc;
