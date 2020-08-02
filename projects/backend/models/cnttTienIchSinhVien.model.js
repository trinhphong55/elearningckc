var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema(
  {
    maTienIch: { type: String},
    tenTienIch: { type: String},
    urlTienIch: { type: String , default: null},
    iconClassTienIch: { type: String},
    maMauTienIch: { type: String},
    trangThai: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TienIch", schema, "cnttTienIchSinhVien");
