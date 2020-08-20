var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  tendot: { type: String },
  mssv: { type: String },
  hoten: { type: String },
  ngaysinh: { type: String },
  noisinh: { type: String },
  sodienthoai: { type: String },
  trangthai: { type: Boolean },
  created_at: { type: Date },
})

module.exports = mongoose.model('ttthdangkidotthi', schema, 'ttth_sinhviendotthi')
