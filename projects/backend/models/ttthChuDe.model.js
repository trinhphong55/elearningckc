var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema(
  {
    maChuDe: { type: String, default: null },
    tenChuDe: { type: String, default: null },
    tenVietTat: { type: String, default: null },
    trangThai: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TTTHChuDe", schema, "ttth_chude");
