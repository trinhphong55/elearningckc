const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChuDeSchema = new Schema({
  thuTu:{
    type:Number,
    required:true,

  },
  maChuDe:{
    type:String,
    required:true,

  },
  tenChuDe:{
    type:String,
    required:true,

  },
  maLopHocPhan:{
    type:String,
    required:true,
  },
  trangThai:{
    type:Number,
    require:true,
    default:1

  },
  ngayChinhSua:{
    type:String,
    require:true,

  },
  ngayTao:{
    type:Date,
    require:true,
    default:Date.now(),

  },
  nguoiChinhSua:{
    type:String,
    require:true,

  },

})

module.exports = mongoose.model('ChuDe', ChuDeSchema, 'ChuDe');
