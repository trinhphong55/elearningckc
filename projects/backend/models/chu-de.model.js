const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChuDeSchema = new Schema({
  thuTu:{
    type:Number,
    required:true,

  },
  maChuDe:{
    type:Number,
    required:true,

  },
  tenChuDe:{
    type:String,
    required:true,

  },
  maLopHocPhan:{
    type:Number,
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
