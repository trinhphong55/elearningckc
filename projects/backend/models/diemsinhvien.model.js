const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const diemsinhvienSchema = new Schema({
  maSinhVien: {
    type: String,
    reqired: true,
  },
  maDaoTao: {
    type: String,
    required: true,

  },
  diem: {
    type: Number,

  },
  maLopHocPhan: {
    type: String,
    required: true,
  },
  ghiChu: {
    type:String,
  },
  nguoiTao: {
    type: String,
    required: true

  },
  nguoiChinhSua: {
    type: String,
    required: true

  },
  ngayChinhSua: {
    type: Date,
    default: Date.now,
  },
  trangThai: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("DiemSinhVien", diemsinhvienSchema,"DiemSinhVien");
