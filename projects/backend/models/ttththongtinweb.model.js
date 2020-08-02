var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  logo: { type: String },
  diachi: { type: String },
  giolamviec: { type: String },
  hotline: { type: String },
  email: { type: String },
  copyright: { type: String },
  mxh: { type: Array },
  nguoisua: { type: String },
  updated_at: { type: Date },
})

module.exports = mongoose.model('ttththongtinweb', schema, 'ttth_thongtinweb')
