var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  loaidiem: { type: String },
  hoten: { type: String },
  mssv: { type: String },
  ngaysinh: { type: String },
  sobaodanh: { type: String },
  noisinh: { type: String },
  lop: { type: String },
  tendotthi: { type: String },
  tongdiem: { type: Number },
  xeploai: { type: String },
  ngaythi: { type: String },
  giothi: { type: String },
  phongthi: { type: String },
  laptrinhc: { type: Number },
  msword: { type: Number },
  msexcel: { type: Number },
  mspowerpoint: { type: Number },
  trangthai:{ type: Boolean , default: true},
  nguoitao: { type: String},
  nguoisua: { type: String ,default: null},
  created_at: { type: Date ,default: Date.now},
  updated_at: { type: Date ,default: null}
})

module.exports = mongoose.model('ttthdiemthi', schema, 'ttth_ketquathi')
