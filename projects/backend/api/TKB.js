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
    return res.json({ TKB: arrayNull, tuanBatDau: 1, tuanKetThuc: 20 });
  }
  const hocKi = req.params.hocKi;

  await TKB.findOne({ maLopHoc, hocKi }).then((tkb) => {
    if (tkb === null) {
      return res.json({ TKB: arrayNull, tuanBatDau: 1, tuanKetThuc: 20 });
    } else {
      return res.json({ TKB: tkb.data, tuanBatDau: tkb.tuanBatDau, tuanKetThuc: tkb.tuanKetThuc });
    }
  });
});

router.post("/", async (req, res) => {
  const { hocKi, maLopHoc, data, tuanBatDau, tuanKetThuc } = req.body;

  await TKB.findOneAndUpdate({ maLopHoc, hocKi }, { $set: { data, tuanBatDau, tuanKetThuc } }).then(
    result => {
      if (result !== null) {
        return res.json({
          status: 200,
          data: [],
          message: "Cap nhat thanh cong",
        });
      } else {
        const newTKB = new TKB({ hocKi, maLopHoc, data, tuanBatDau, tuanKetThuc });
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
