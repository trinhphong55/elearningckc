const mongoose = require('mongoose');

const KeHoachDaoTaoSchema = new mongoose.Schema({
  maDaoTao: {
    type: String,
    required: true
  },
  maChuongTrinhDaoTao: {
    type: String,
    required: true,
  },
  maMonHoc: {
    type: String,
    required: true,
  },
  maBoMon: {
    type: String,
    required: true,
  },
  donViHocTrinh: {
    type: Number,
    default: 15,
  },
  soTietHoc: {
    type: Number,
    default: 45,
  },
  soTuan: {
    type: Number,
    default: 15,
  },
  hocKi: {
    type: Number,
    default: 1,
  },
  loaiTienThu: {
    type: String,
    default: "Lý thuyết",
  },
  tinh: {
    type: Boolean,
    default: true,
  },
  xet: {
    type: Boolean,
    default: true,
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

const KeHoachDaoTao = mongoose.model('KeHoachDaoTao', KeHoachDaoTaoSchema, 'KeHoachDaoTao');

module.exports = KeHoachDaoTao;
