var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema(
  {
    loaiBaiViet: { type: String, default: null },
    maDanhMuc: { type: String, default: null },
    maBaiViet: { type: String, default: null },
    tieuDe: { type: String, default: null },
    tieuDeASCII: { type: String, default: null },
    moTaNgan: { type: String, default: null },
    noiDung: { type: String, default: null },
    noiDungASCII: { type: String, default: null },
    anhBia: { type: String, default: null },
    nguoiViet: { type: String, default: null },
    thoiGianDangBai: { type: Date },
    viTriHienThi: { type: Number, default: null },
    thuTuHienThi: { type: Number, default: 999 },
    crawling: { type: Boolean, default: false },
    crawlURL: { type: String, default: null },
    trangThai: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TinTuc", schema, "cnttBaiViet");
