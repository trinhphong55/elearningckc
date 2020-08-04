const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChuDeSchema = new Schema({
  thuTu:{
    type:Number,
    require:true,

  },
  maChuDe:{
    type:String,
    require:true,

  },
  tenChuDe:{
    type:String,
    require:true,

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
