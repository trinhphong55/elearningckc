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
    type:Number,
    required:true,
    unique:true

  },
  maChuDe:{
    type:Number,
    required:true,

  },
  maLopHocPhan:{
    type:Number,
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
