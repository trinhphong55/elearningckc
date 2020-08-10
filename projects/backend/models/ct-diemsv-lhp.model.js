const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CTDiemSVLopHocPhan = new Schema({
  maSinhVien: {
    type: String,
    required: true,
  },

  maHocPhan: {
    type: Number,
    required: true,
  },

  maCotDiem: {
    type: String,
    required: true,
  },
  maChuDe: {
    type: String,
    required: true,
  },
  diem: {
    type: Number,
    required: true,
  },
  nguoiTao: {
    type: String,
    required: true,
  },

  nguoiChinhSua: {
    type: String,

  },
  ngayChinhSua: {
    type: Date,
    required: true,
    default:Date.now()
  },
  trangThai: {
    type: Number,
    required: true,
    default:1,
  },
});

module.exports = mongoose.model(
  "ChiTietDiemSinhVienLopHocPhan",
  CTDiemSVLopHocPhan,
  "ChiTietDiemSinhVienLopHocPhan"
);
