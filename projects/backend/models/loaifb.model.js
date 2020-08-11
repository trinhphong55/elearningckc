const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const loaifbSchema = new Schema({
    maLoai: {
      type: Number,
      reqired: true,
    },
    loai: {
      type: String,
      required: true,
    },
  });

  module.exports = mongoose.model("LoaiFB", loaifbSchema,"LoaiFB");