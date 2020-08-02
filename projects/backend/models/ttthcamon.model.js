var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  icon: { type: String },
  tieudechinh: { type: String },
  tieudephu: { type: String },
  trangthai: { type: Boolean },
  nguoitao: { type: String },
  nguoisua: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
})

module.exports = mongoose.model('ttthcamon', schema, 'ttth_home_camon')
