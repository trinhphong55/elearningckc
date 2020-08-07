var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  hoten: { type: String },
  mssv: { type: String },
  ngaysinh: { type: String },
  sobaodanh: { type: String },
  noisinh: { type: String },
  lop: { type: String },
  tongdiem: { type: String },
  xeploai: { type: String },
  ngaythi: { type: String },
  giothi: { type: String },
  phongthi: { type: String },
  laptrinhc: { type: String },
  msword: { type: String },
  msexcel: { type: String },
  mspowerpoint: { type: String },
  trangthai:{ type: Boolean , default: true},
  nguoitao: { type: String , default: 'Giáo viên A'},
  nguoisua: { type: String , default: 'Giáo viên B'},
  created_at: { type: Date ,default: Date.now},
  updated_at: { type: Date ,default: null}
})

module.exports = mongoose.model('ttthdiemthi', schema, 'ttth_ketquathi')
