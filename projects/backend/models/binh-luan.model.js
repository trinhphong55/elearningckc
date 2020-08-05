const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BinhLuanSchema = new Schema({
  maBinhLuan:{
    type:String,
    required:true
  },
  loaiBaiViet:{
    type:String,
    required:true,
  },
  maBaiViet:{
    type:String,
    required:true
  },
  noiDung:{
    type:String,
    required:true
  },
  nguoiTao:{
    type:String,
    required:true
  },
  ngayTao:{
    type:Date,
    required:true,
    default:Date.now(),
  },
  trangThai:{
    type:Number,
    default:1,
  },
});
module.exports = mongoose.model('BinhLuan', BinhLuanSchema, 'BinhLuan');
