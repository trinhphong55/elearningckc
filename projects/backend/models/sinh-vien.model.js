const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
// "_id": {
//   "$oid": "5efe0fb6f30afb6ea1ceeaf4"
// },
// "maSinhVien": "mã Bậc + Mã Ngành + Khoá Học + mã Loại Hình Đào Tạo + Số thứ tự",
// "CMND": "kiểu String",
// "ho": "kiểu String",
// "ten": "kiểu String",
// "gioiTinh": "kiểu Int",
// "ngaySinh": "kiểu String",
// "diaChiThuongTru": "kiểu String",
// "diaChiTamTru": "kiểu String",
// "sdt": "kiểu String",
// "email": "kiểu String",
// "matKhau": "kiểu String",
// "tokens": [
//   {
//       "token": "kiểu String"
//   }
// ],
// "hoTenCha": "kiểu String",
// "hoTenMe": "kiểu String",
// "sdtCha": "kiểu String",
// "sdtMe": "kiểu String",
// "maLopHoc": "mã trong bảng Lớp Học",
// "trangThai": "kiểu Int",
// "nguoiTao": "mã trong bảng Giáo Viên",
// "nguoiChinhSua": "mã trong bảng Giáo Viên",
// "ngayChinhSua": "kiểu DateTime"
const SinhVienSchema = new Schema({
  maSinhVien:{
    type:String,
    required:true
  },
  CMND:{
    type:String,
    required:true
  },
  ho:{
    type:String,
    required:true
  },
  ten:{
    type:String,
    required:true
  },
  gioiTinh:{
    type:String,
    required:true
  },
  ngaySinh:{
    type:Date,
    default:Date.now(),
    required:true
  },
  diaChiThuongTru:{
    type:String,
    required:true
  },
  diaChiTamTru:{
    type:String,
    required:true
  },
  sdt:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  matKhau:{
    type:String,
    required:true
  },
  tokens:{
    type:String,
    required:true
  },
  hoTenCha:{
    type:String,
    required:true
  },
  hoTenMe:{
    type:String,
    required:true
  },
  sdtCha:{
    type:String,
    required:true
  },
  sdtMe:{
    type:String,
    required:true
  },
  maLopHoc:{
    type:String,
    required:true
  },
  trangThai:{
    type:String,
    required:true
  },
  nguoiTao:{
    type:String,
    required:true
  },
  nguoiChinhSua:{
    type:String,
    required:true
  },
  ngayChinhSua:{
    type:Date,
    default:Date.now(),
    required:true
  }
});

module.exports = mongoose.model('SinhVien',SinhVienSchema,'SinhVien');
