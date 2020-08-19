var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  makhoahoc: { type: String },
  dot: { type: String },
  tenlop: { type: String },
  buoihoc: { type: String },
  giohoc: { type: String },
  ngaykhaigiang: { type: String },
  nam: { type: String },
  hocphi: { type: String },
  ngayhethan: { type: String },
  giaovien: { type: String },
  nhapdiem: { type: String },
  trangthai: { type: Number },
  nguoitao: { type: String },
  nguoisua: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
})

module.exports = mongoose.model('ttthlophoc', schema, 'ttth_lophoc')
