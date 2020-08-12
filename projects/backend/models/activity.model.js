const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  loaiActivity: {
    type: String,
    required: true,
  },
  role: {
    required: true,
    type: String,
  },
  noiDung: {
    type: String,
    trim: true,
    required: true,
  },
  maLopHocPhan: {
    required: true,
    type: Number,
  },
  loaiDoiTuong: {
    type: String,
    required: true,
  },
  maDoiTuong: {
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

const activity = mongoose.model('Activity', ActivitySchema, 'Activity');

module.exports = activity;
