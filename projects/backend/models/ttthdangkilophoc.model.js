var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  mssv: { type: String },
  hoten: { type: String },
  ngaysinh: { type: String },
  noisinh: { type: String },
  sodienthoai: { type: String },
  lophoc: { type: String },
  hinhthuchoc: { type: String },
  trangthai: { type: Boolean },
  created_at: { type: Date },
})

module.exports = mongoose.model('ttthdangkilophoc', schema, 'ttth_sinhvienlophoc')
