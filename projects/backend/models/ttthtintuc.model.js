var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  id_loaitintuc: { type: String },
  image: { type: String },
  tentintuc: { type: String },
  slug: { type: String },
  description: { type: String },
  noidung: { type: String },
  hienthi: { type: Boolean },
  trangthai: { type: Boolean },
  nguoitao: { type: String },
  nguoisua: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
})

module.exports = mongoose.model('ttthtintuc', schema, 'ttth_tintuc')
