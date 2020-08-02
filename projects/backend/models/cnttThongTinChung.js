var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema(
  {
    logo: { type: String, default: null },
    logoMenuMobile: { type: String, default: null },
    diaChi: { type: String, defualt: null },
    email: { type: String, defualt: null },
    copyRight: { type: String, defualt: null },
    soDienThoai: { type: String, defualt: null },
    urlFacebook: { type: String, defualt: null },
    urlYoutube: { type: String, defualt: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ThongTinChung", schema, "cnttThongTinChung");
