const mongoose = require('mongoose');

const GiaoVienLopHocPhanSchema = new mongoose.Schema({
  maLopHocPhan: {
    type: String,
    required: true
  },
  maGiaoVien: {
    type: String,
    required: true,
  },
  loai: {
    type: String,
    required: true,
  },
  ghiChu: {
    type: String,
    default: "",
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

const GiaoVienLopHocPhan = mongoose.model('GiaoVienLopHocPhan', GiaoVienLopHocPhanSchema, 'GiaoVienLopHocPhan');

module.exports = GiaoVienLopHocPhan;
