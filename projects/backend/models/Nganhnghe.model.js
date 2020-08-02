
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const NganhNgheModelSchema = new Schema({
    maNganhNghe: {
    type: String,
  },
  tenNganhNghe: {
    type: String,
  },
  tenVietTat: {
    type: String,
  },
  maBac: {
    type: String,
  },
  maNganhCha: {
    type: String,
  },
  nguoiTao: {
    type: String,
    default: "phong monkey ",
  },
  nguoiChinhSua: {
    type: String,
    default: "phong monkey",
  },
  ngayChinhSua: {
    type: Date,
    default: Date.now,
  },
  trangThai: {
    type: Number,
    default: 1,
  },
});

const NganhNgheModel = mongoose.model("NganhNghe", NganhNgheModelSchema  ,"NganhNghe");

module.exports = NganhNgheModel ;