const mongoose = require('mongoose');

const LoaiHinhDaoTaoSchema = new mongoose.Schema({
  maLoaiHinhDaoTao: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  tenLoaiHinhDaoTao: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  tenVietTat: {
    type: String,
    required: true,
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
  ngayTao: {
    type: Date,
    default: Date.now,
  },
});

const LoaiHinhDaoTao = mongoose.model('LoaiHinhDaoTao', LoaiHinhDaoTaoSchema, 'LoaiHinhDaoTao');

module.exports = LoaiHinhDaoTao;
