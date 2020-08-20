const mongoose = require("mongoose");
var NganhNghe = require("../models/Nganhnghe.model");
var Bac = require("../models/Bac.model");
const router = require("express").Router();
const isNameExist = require("../utils/NganhNghe.util");

//get nganh nghe
router.get("/nganhnghe", async (req, res) => {
  try {
    var data = await NganhNghe.find({ trangThai: 1 }).exec();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

//lay nganh nghe theo id
router.get("/nganhnghe/:id", async (req, res) => {
  var _id = req.params.id.toString();
  try {
    var data = await NganhNghe.findById(req.params.id).exec();
    var data = await NganhNghe.findOne({ _id: _id });
    // console.log(data)
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

//them nganh nghe
router.post("/nganhnghe", async (req, res) => {
  try {
    var ktmaNganhNghe = await NganhNghe.find({
      maNganhNghe: req.body.maNganhNghe,
    }).exec();
    var kttenNganhNghe = await isNameExist(req.body.tenNganhNghe);
    if (ktmaNganhNghe == "" || !kttenNganhNghe) {
      const nganh = new NganhNghe(req.body);
      var data = await nganh.save();
      res.status(201).json({ data });
    } else {
      res.status(500).json({ message: "lỗi trùng dữ liệu" });
    }
  } catch (error) {
    return error;
  }
});
//sua nganh nghe
router.put("/nganhnghe/:id", async (req, res) => {
  var ktmaNganhNghe = await NganhNghe.find({
    maNganhNghe: req.body.maNganhNghe,
  }).exec();
  const { maNganhNghe, tenNganhNghe, tenVietTat, maBac, maNganhCha } = req.body;
  await NganhNghe.updateOne(
    { _id: req.params.id },
    { $set: { maNganhNghe, tenNganhNghe, tenVietTat, maBac, maNganhCha } }
  )
    .then(() => {
      res.json({ status: "success" });
    })
    .catch((err) => {
      res.json({ message: err });
    });
});
//xoa nganh nghe
router.put("/deletenganhnghe/:id", async (req, res) => {
  try {
    var data = await NganhNghe.findByIdAndUpdate(
      req.params.id,
      { trangThai: 0 },
      req.params.idoptions,
      req.params.id.callback
    );
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});
//Nguoi Tao: Tran Dinh Huy, MSSV:0306171249
router.delete("/nganhnghe/:id", async (req, res) => {
  try {
    var data = await NganhNghe.findByIdAndUpdate(
      req.params.id,
      { trangThai: 0 },
      req.params.idoptions,
      req.params.id.callback
    );
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

//importexcel
router.post("/nganhnghe/importexcel", async (req, res) => {
  var items = req.body;
  var filterItems = [];

  //Get next ma nganh nghe

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index);
    }
  }
  ư;
  const start = async () => {
    // goi ham
    await asyncForEach(items, async (nn, index) => {
      await NganhNghe.findOne({ tenNganhNghe: nn.tenNganhNghe })
        .exec()
        .then((data) => {
          filterItems.push(nn);
        });
    });
  };
  await start();
  if (filterItems.length > 0) {
    NganhNghe.insertMany(filterItems)
      .then(() => {
        res.json({ success: "added nganh nghe from Excel" });
      })
      .catch((err) => {
        res.json({ message: err });
      });
  } else {
    res.json({ error: "du lieu trong hoac da ton tai" });
  }
});

// Get list nganhnghe by maBac
router.get("/dsnn/:mabac", async (req, res) => {
  const maBac = parseInt(req.params.mabac);
  await NganhNghe.find({ maBac })
    .then((ds) => {
      return res.json(ds);
    })
    .catch((err) => {
      return res.json({ message: err });
    });
});

//
var ok = require("../models/sinh-vien.model");
router.delete("/ok", async (req, res) => {
  var haha = await ok.deleteMany();
});

module.exports = router;
