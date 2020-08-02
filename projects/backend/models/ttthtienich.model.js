var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  ten: { type: String },
  mota: { type: String },
  image: { type: String },
  link: { type: String },
  trangthai: { type: Boolean },
  nguoitao: { type: String },
  nguoisua: { type: String },
  created_at: { type: Date },
  updated_at: { type: Date },
})

module.exports = mongoose.model('ttthtienich', schema, 'ttth_home_tienich')
