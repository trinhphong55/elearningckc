const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const Schema = mongoose.Schema;

const BinhLuanSchema = new Schema({
  maBinhLuan:{
    type:ObjectID,
    required:true,

  },
  loaiBaiViet:{
    type:String,
    required:true,
  },
  maBaiViet:{
    type:Number,
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
