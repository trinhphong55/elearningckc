var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema(
  {
    maBST: { type: String, default: null },
    url: { type: String, default: null },
    src: { type: String, default: null },
    alt: { type: String, default: null },
    trangThai: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BoSuuTap", schema, "cnttBoSuuTap");
