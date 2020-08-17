var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  id_loaitintuc: { type: String },
  image: { type: String },
  tentintuc: { type: String },
  tentintucASCII: { type: String, default: null },
  description: { type: String },
  noidung: { type: String },
  noidungASCII: { type: String, default: null },
  thuTuHienThi: { type: Number, default: 999 },
  trangthai: { type: Boolean },
  nguoitao: { type: String },
  nguoisua: { type: String },
  thoiGianTao: { type: Date },
  thoiGianChinhSua: { type: Date },
});

module.exports = mongoose.model("ttthtintuc", schema, "ttth_tintuc");
