const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CotDiemLopHocPhanSchema = new Schema({
  maLopHocPhan:{
    type:String,
    required: true,
  },

  maGiaoVien:{
    type:String,
    required: true,
  },

  maCotDiem:{
    type:String,
    required: true,
  },

  tenCotDiem:{
    type:String,
    required: true,
  },

  heSo:{
    type:Number,
    required: true,
  },

  tinhDiem:{
    type:Number,
    required: true,
  },

  nguoiTao:{
    type:String,
    required: true,
  },

  nguoiChinhSua:{
    type:String,
    required: true,
  },

  ngayChinhSua:{
    type:String,
    required: true,
  },

  trangThai:{
    type:Number,
    required: true,
  },

});

module.exports = mongoose.model('CotDiemLopHocPhan', CotDiemLopHocPhanSchema, 'CotDiemLopHocPhan');
