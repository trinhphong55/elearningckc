const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const pagefbSchema = new Schema({
    id_Page: {
      type: String,
      reqired: true,
      unique:true
    },
    tenPage: {
      type: String,
      required: true,
      unique:true

    },
    linkPage: {
      type: String,
      required: true

    },
    trangThai: {
      type: Number,
      default: 1,
    },

  });

  module.exports = mongoose.model("PageFB", pagefbSchema,"PageFB");
