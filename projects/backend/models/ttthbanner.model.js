var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  image: { type: String },
  vitri: { type: String },
  link: { type: String },
  hienthi: { type: Boolean },
  trangthai: { type: Boolean },
  nguoitao: { type: String },
  nguoisua: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
})

module.exports = mongoose.model('ttthbanner', schema, 'ttth_banner')
