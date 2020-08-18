var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  tendot: { type: String },
  lophoc: { type: String },
  ngaythi: { type: String },
  giothi: { type: String },
  phongthi: { type: String },
  ngayhethan: { type: String },
  trangthai: { type: Number },
  nguoitao: { type: String },
  nguoisua: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
})

module.exports = mongoose.model('ttthdotthi', schema, 'ttth_dotthi')
