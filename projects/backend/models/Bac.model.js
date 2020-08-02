const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const BacModelSchema = new Schema({
    maBac: {
    type: String,
  },
  tenBac: {
    type: String,
  },
  tenVietTat: {
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

const BacModel = mongoose.model("Bac", BacModelSchema,"Bac");

module.exports = BacModel ;