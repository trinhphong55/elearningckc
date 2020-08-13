const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const diemsinhvienSchema = new Schema({
  maSinhVien: {
    type: String,
  },
  maDaoTao: {
    type: String,

  },
  diem: {
    type: Number,

  },
  maLopHocPhan: {
    type: String,
  },
  ghiChu: {
    type:String,
  },
  nguoiTao: {
    type: String,

  },
  nguoiChinhSua: {
    type: String,

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
