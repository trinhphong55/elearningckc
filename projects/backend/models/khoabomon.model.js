const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const khoabomonSchema = new Schema({
  maKhoa: {
    type: Number,
    reqired: true,
    unique:true
  },
  tenKhoa: {
    type: String,
    required: true,
    unique:true

  },
  tenVietTat: {
    type: String,
    required: true

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
    default: Date.now(),
  },
  trangThai: {
    type: Number,
    default: 1,
  },
  maLoai:{
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Khoa", khoabomonSchema,"Khoa");
