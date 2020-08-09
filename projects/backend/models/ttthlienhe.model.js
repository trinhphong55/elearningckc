var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  ten: { type: String },
  email: { type: String },
  noidung: { type: String },
  ngaygui: { type: Date },
  trangthai: { type: Boolean },
})

module.exports = mongoose.model('ttthlienhe', schema, 'ttth_lienhe')
