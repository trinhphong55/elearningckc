var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  makhoahoc: { type: String },
  dot: { type: String },
  lop: { type: String },
  buoihoc: { type: String },
  giohoc: { type: String },
  ngaykhaigiang: { type: String },
  hocphi: { type: String },
  giaovien: { type: String },
  nhapdiem: { type: String },
  trangthai: { type: Boolean },
  nguoitao: { type: String },
  nguoisua: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
})

module.exports = mongoose.model('ttthlophoc', schema, 'ttth_lophoc')
