const mongoose = require('mongoose');
var NganhNghe = require("../models/NganhNghe.model");
var Bac = require("../models/Bac.model");
const { json } = require('body-parser');
const router = require('express').Router();
const getNextNumber = require('../utils/NganhNghe.util');

//get nganh nghe
router.get('/nganhnghe', async (req, res) => {
  try {
    var data = await NganhNghe.find({ trangThai: 1 }).exec();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
})

//lay nganh nghe theo id
router.get('/nganhnghe/:id', async (req, res) => {

  console.log(req.params.id);
  var _id = (req.params.id).toString();
  try {
    var data = await NganhNghe.findById(req.params.id).exec();
    var data = await NganhNghe.findOne({_id:_id})
    console.log(data)
    res.json(data);
    console.log(data);
  } catch (error) {
    res.json({ message: error });
  }
})

//them nganh nghe
router.post('/nganhnghe', async (req, res) => {
  const nganh = new  NganhNghe (req.body );
  try {
    var data = await nganh.save();
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  console.log(req.body);
});
//sua ngah nghe
router.put('/nganhnghe/:id', async (req, res) => {
  console.log('du lieu chua update', req.params.id);
  const { maNganhNghe, tenNganhNghe, tenVietTat, maBac, maNganhCha } = req.body;
  await NganhNghe.updateOne(
      { _id:req.params.id },
      { $set: { maNganhNghe, tenNganhNghe, tenVietTat, maBac, maNganhCha } }
  ).then(() => {
    res.json({ status: "success" });
  }).catch(err => {
    res.json({ message: err });
  });
})
//xoa nganh nghe
router.put('/deletenganhnghe/:id', async (req, res) => {
  try {
    var data = await NganhNghe.findByIdAndUpdate(req.params.id, { "trangThai": 0 }, req.params.idoptions, req.params.id.callback)
    res.json(data);
    console.log(data);
  } catch (error) {
    res.json({ message: error });
  }
});
//Nguoi Tao: Tran Dinh Huy, MSSV:0306171249
router.delete('/nganhnghe/:id', async(req, res) => {
  try {
    var data = await NganhNghe.findByIdAndUpdate(req.params.id, { "trangThai": 0 }, req.params.idoptions, req.params.id.callback)
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
})


//importexcel
router.post('/nganhnghe/importexcel', async (req, res) => {
  console.log('BAT DAU IMPORT EXCEL');
  var items = req.body;
  var filterItems = [];

  //Get next ma nganh nghe
  var MaNganhNghe = await getNextNumber();
  var numMaNganhNghe = parseInt(MaNganhNghe);

  async function asyncForEach(array, callback) {
    console.log('Xu ly excel');
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index);
    }
  }
  const start = async () => { // goi ham
    await asyncForEach(items, async (nn, index) => {
      await NganhNghe.findOne({ tenNganhNghe: nn.tenNganhNghe }).exec().then((data) => {
        if (data === null) {
          let stringMaNganhNghe = "00" + numMaNganhNghe;
          nn.maNganhNghe = stringMaNganhNghe.slice(stringMaNganhNghe.length - 4, stringMaNganhNghe.length);
          numMaNganhNghe++;
          filterItems.push(nn);
        }
      });
      console.log(nn.tenNganhNghe, index);
    });
    console.log('Done');
  }
  await start();

  console.log(filterItems);

  if (filterItems.length > 0) {
    NganhNghe.insertMany(filterItems).then(() => {
      res.json({ success: "added nganh nghe from Excel" });
    }).catch((err) => {
      res.json( {message: err});
    })
  } else {
    res.json( {error: "du lieu trong hoac da ton tai"})
  }
});

 module.exports = router;
