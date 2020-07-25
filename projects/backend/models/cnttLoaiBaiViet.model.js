var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema(
  {
    maLoaiBaiViet: { type: String, default: null },
    tenLoaiBaiViet: { type: String, default: null },
    tenVietTat: { type: String, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('LoaiBaiViet', schema, 'cnttLoaiBaiViet')
