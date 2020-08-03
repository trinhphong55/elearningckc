const router = require("express").Router();
const TKB = require("../models/TKB.model");

router.get("/malophoc/:maLopHoc/hocki/:hocKi", async (req, res) => {
  const maLopHoc = req.params.maLopHoc;
  const arrayNull = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],

    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];

  if (maLopHoc === "null") {
    return res.json(arrayNull);
  }
  const hocKi = req.params.hocKi;

  await TKB.findOne({ maLopHoc, hocKi }).then((tkb) => {
    if (tkb === null) {
      return res.json(arrayNull);
    } else {
      return res.json(tkb.data);
    }
  });
});

router.post("/", async (req, res) => {
  const hocKi = parseInt(req.body.hocKi);
  const maLopHoc = req.body.maLopHoc;
  const data = req.body.data;

  await TKB.findOneAndUpdate({ maLopHoc, hocKi }, { $set: { data } }).then(
    result => {
      if (result !== null) {
        return res.json({
          status: 200,
          data: [],
          message: "Cap nhat thanh cong",
        });
      } else {
        const newTKB = new TKB({ hocKi, maLopHoc, data });
        newTKB.save().then(() => {
          return res.json({
            status: 200,
            data: [],
            message: "Them moi thanh cong",
          });
        })
        .catch((err) => {
          return res.json({
            status: 500,
            data: err,
            message: "Internal Server Error",
          });
        });
      }
    }
  )
  .catch((err) => {
    return res.json({
      status: 500,
      data: err,
      message: "Internal Server Error",
    });
  });
});

module.exports = router;
