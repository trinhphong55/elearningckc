var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  maTT : {type : String},
  maLTT : {type : String},
  maLTTCha : {type : String},
  tieuDe : {type : String},
  noiDungNgan : {type : String},
  noiDung : {type : String},
  anhDaiDien : {type : String},
  nguoiViet : {type : String},
  ngayViet : {type : String},
  nguoiChinhSua : {type : String},
  ngayChinhSua : {type : String},
  trangThai : {type : String},


})

module.exports = mongoose.model('TinTuc', schema, 'cnttTinTuc')
