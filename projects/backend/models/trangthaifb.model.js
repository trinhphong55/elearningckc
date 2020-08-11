const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const trangthaifbSchema = new Schema({
    trangThai: {
      type: Number,
      reqired: true,
    },
    tenTrangThai: {
      type: String,
      required: true,
    },
  });

  module.exports = mongoose.model("TinhTrangPostFB", trangthaifbSchema,"TinhTrangPostFB");