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
<<<<<<< HEAD

=======
>>>>>>> 036b382d084b4ab8ca50a866e9738ac3870995e0
    trangThai: {
      type: Number,
      default: 1,
    },

  });

  module.exports = mongoose.model("PageFB", pagefbSchema,"PageFB");
