var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  tenkhoahoc: { type: String },
  image: { type: String },
  makhoahoc: { type: String },
  noidung: { type: String },
  color: { type: String },
  nhapdiem: { type: String },
  trangthai: { type: Boolean },
  nguoitao: { type: String },
  nguoisua: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
})

module.exports = mongoose.model('ttthkhoahoc', schema, 'ttth_khoahoc')
