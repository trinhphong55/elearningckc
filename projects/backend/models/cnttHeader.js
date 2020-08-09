const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    icon1: { type: String, default: null },
    name1: { type: String, default: null },
    url1: { type: String, default: null },
    sub1: [
      {
        name: { type: String, default: null },
        url: { type: String, default: null },
      },
    ],
    icon2: { type: String, default: null },
    name2: { type: String, default: null },
    url2: { type: String, default: null },
    sub2: [
      {
        name: { type: String, default: null },
        url: { type: String, default: null },
      },
    ],
    icon3: { type: String, default: null },
    name3: { type: String, default: null },
    url3: { type: String, default: null },
    sub3: [
      {
        name: { type: String, default: null },
        url: { type: String, default: null },
      },
    ],
    icon4: { type: String, default: null },
    name4: { type: String, default: null },
    url4: { type: String, default: null },
    sub4: [
      {
        name: { type: String, default: null },
        url: { type: String, default: null },
      },
    ],
    icon5: { type: String, default: null },
    name5: { type: String, default: null },
    url5: { type: String, default: null },
    sub5: [
      {
        name: { type: String, default: null },
        url: { type: String, default: null },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("cnttHeader", schema, "cnttHeader");
