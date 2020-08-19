const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const khoabomonSchema = new Schema({
  maBoMon: {
    type: String,
    reqired: true,
    unique:true
  },
  tenBoMon: {
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
  ngayTao:{
    type:Date,
    default: Date.now()
  },
  trangThai: {
    type: Number,
    default: 1,
  },
  maKhoa:{
    type:Number,

  },
  maLoai:{
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("BoMon", khoabomonSchema,"BoMon");
