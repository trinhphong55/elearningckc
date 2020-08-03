const mongoose = require('mongoose');

const TKBSchema = new mongoose.Schema({
  maLopHoc: {
    type: String,
    require: true,
  },
  hocKi: {
    type: Number,
    require: true,
  },
  data: {
    type: Array,
    default: [
      ["0001", "", "", "", ""],
      ["", "0001", "", "", ""],
      ["", "", "0001", "", ""],
      ["", "", "", "0001", ""],
      ["", "", "", "", "0001"],
      ["0001", "", "", "", ""],
      ["", "0001", "", "", ""],
      ["", "", "0001", "", ""],
      ["", "", "", "0001", ""],
      ["", "", "", "", "0001"],
      ["0001", "", "", "", ""],
      ["", "0001", "", "", ""],
    ]
  },
  nguoiTao: {
    type: String,
    default: "Yasuo",
  },
  nguoiChinhSua: {
    type: String,
    default: "Yasuo",
  },
  ngayChinhSua: {
    type: Date,
    default: Date.now,
  },
  trangThai: {
    type: Number,
    default: 1,
  },
  ngayTao: {
    type: Date,
    default: Date.now,
  },
});

const TKB = mongoose.model('TKB', TKBSchema, 'TKB');

module.exports = TKB;
