const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BaiGiangSchema = new Schema({
  thuTu:{
    type:Number,
    required:true,
    unique:true
  },
  tieuDe:{
    type:String,
    required:true,

  },
  maBaiGiang:{
    type:String,
    required:true,
    unique:true

  },
  maChuDe:{
    type:String,
    required:true,

  },
  maLopHocPhan:{
    type:String,
    required:true,

  },

  dinhKem:{
    type:Array,
    required:true,

  },
  moTa:{
    type:String,
    required:true,

  },
  nguoiDang:{
    type:String,
    required:true,

  },
  ngayTao:{
    type:Date,
    required:true,
    default:Date.now(),

  },
  ngayChinhSua:{
    type:Date,
    required:true,
    default:Date.now()

  },
  trangThai:{
    type:Number,
    required:true,
    default:1

  },
  nguoiChinhSua:{
    type:String,
    required:true,

  },


})

module.exports = mongoose.model('BaiGiang', BaiGiangSchema, 'BaiGiang');
