var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema(
  {
    loaiBaiViet: { type: String, default: null },
    maDanhMuc: { type: String, default: null },
    maBaiViet: { type: String },
    tieuDe: { type: String, default: null },
    moTaNgan: { type: String, default: null },
    noiDung: { type: String, default: null },
    anhBia: { type: String, default: null },
    nguoiViet: { type: String, default: null },
    thoiGianDangBai: { type: Date, default: Date.now() },
    viTriHienThi: { type: Number, default: null },
    crawling: { type: Boolean, default: false },
    crawlURL: { type: String, default: null },
    trangThai: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TinTuc", schema, "cnttBaiViet");
