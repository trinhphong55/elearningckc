var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  loaiBaiViet: { type: String },
  maDanhMuc: { type: String },
  maBaiViet: { type: String },
  tieuDe: { type: String },
  moTaNgan: { type: String },
  noiDung: { type: String },
  anhBia: { type: String },
  nguoiViet: { type: String },
  thoiGianDangBai: { type: Date },
  thongBaoKhanCap: { type: Boolean },
  created_at: { type: Date },
  updated_at: { type: Date },
  trangThai: { type: Number },
})

module.exports = mongoose.model('BaiViet', schema, 'cnttBaiViet')
