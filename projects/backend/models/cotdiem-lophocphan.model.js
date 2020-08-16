const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CotDiemLopHocPhanSchema = new Schema({
  maLopHocPhan:{
    type:String,
  
  },
  maBaiTap:{
    type:Number,
  
  },

  maGiaoVien:{
    type:String,
   
  },

  maCotDiem:{
    type:String,
   
  },

  tenCotDiem:{
    type:String,
    
  },

  heSo:{
    type:Number,
   
  },

  tinhDiem:{
    type:String,
    
  },

  nguoiTao:{
    type:String,
   
  },

  nguoiChinhSua:{
    type:String,
    
  },

  ngayChinhSua:{
    type:Date,
    
    default:Date.now(),
  },

  trangThai:{
    type:Number,
    default: 1,
  }

});

module.exports = mongoose.model('CotDiemLopHocPhan', CotDiemLopHocPhanSchema, 'CotDiemLopHocPhan');
