const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name1: { type: String, default: null },
    url1: { type: String, default: null },
    sub1: [
      {
        name: { type: String, default: null },
        url: { type: String, default: null },
      },
    ],

    name2: { type: String, default: null },
    url2: { type: String, default: null },
    sub2: [
      {
        name: { type: String, default: null },
        url: { type: String, default: null },
      },
    ],

    name3: { type: String, default: null },
    url3: { type: String, default: null },
    sub3: [
      {
        name: { type: String, default: null },
        url: { type: String, default: null },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("cnttFooter", schema, "cnttFooter");
