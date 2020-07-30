var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema(
  {
    maDanhMuc: { type: String, default: null },
    tenDanhMuc: { type: String, default: null },
    tenVietTat: { type: String, default: null },
    trangThai: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DanhMuc", schema, "cnttDanhMuc");
