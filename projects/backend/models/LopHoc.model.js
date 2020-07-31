const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// "maLopHoc": "mã Bậc + mã Ngành Nghề + Khoá Học + mã Loại Hình Đào Tạo + Số thứ tự",
//   "tenLop": "kiểu String",
//   "tenVietTat": "kiểu String",
//   "linkFBLopHoc": "kiểu String",
//   "nguoiTao": "mã trong bảng Giáo Viên",
//   "nguoiChinhSua": "mã trong bảng Giáo Viên",
//   "ngayChinhSua": "kiểu DateTime",
//   "trangThai": "kiểu Int"
const LopHocSchema = new Schema({
  maLopHoc: {
    type: String,
    required: true,
    unique:true

  },
  tenLop: {
    type: String,
    required: true,


  },
  tenVietTat: {
    type: String,
    required: true,
    unique:true,
  },
  linkFBLopHoc: {
    type: String,
    required: true,

  },
  nguoiTao: {
    type: String,
    required: true,
  },
  nguoiChinhSua: {
    type: String,
    required: true,
  },
  ngayChinhSua: {
    type: Date,
    required: true,
    default: Date.now(),

  },
  trangThai: {
    type: Number,
    required: true,
    default:1
  },
  maNganh:{
    type:String,
    required : true,
  },
  maBac:{
    type:Number,
    require: true
  },
  khoa:{
    type:String,
    required: true,

  },

  tenGroupFB:{
    type:String,
    default:'facebook',
  },
  IDGroupFB:{
    type:String,
    default:'facebook',
  },
  linkGroupFB:{
    type:String,
    default:'facebook',
  },
});

module.exports = mongoose.model("LopHoc", LopHocSchema, "LopHoc");
