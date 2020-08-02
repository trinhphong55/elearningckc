var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema(
  {
    maSlide: { type: String, default: null },
    tenSlide: { type: String, default: null },
    danhSachHinhAnh: [
      {
        url: { type: String, default: null },
        src: { type: String, default: null },
        alt: { type: String, default: null },
        trangThai: { type: Number, default: 1 },
      },
    ],
    trangThai: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SlideShow", schema, "cnttSlideShow");
