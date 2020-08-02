const mongoose = require('mongoose');

const ChuongTrinhDaoTaoSchema = new mongoose.Schema({
  maChuongTrinhDaoTao: {
    type: String,
    unique: true,
    required: true
  },
  maBac: {
    type: String,
    required: true,
  },
  maNganhNghe: {
    type: String,
    required: true,
  },
  khoaHoc: {
    type: String,
    required: true,
  },
  maLoaiHinhDaoTao: {
    type: String,
    required: true,
  },
  soHocKi: {
    type: Number,
    default: 1,
  },
  chiTieu: {
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
  ngayTao: {
    type: Date,
    default: Date.now,
  },
});

const ChuongTrinhDaoTao = mongoose.model('ChuongTrinhDaoTao', ChuongTrinhDaoTaoSchema, 'ChuongTrinhDaoTao');

module.exports = ChuongTrinhDaoTao;
