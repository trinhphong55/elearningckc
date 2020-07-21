const mongoose = require('mongoose');
var NganhNghe = require("../models/NganhNghe.model");
var Bac = require("../models/Bac.model");
const { json } = require('body-parser');
const router = require('express').Router();

router.get('/nganhnghe', async (req, res) => {
  try {
    var data = await NganhNghe.find({ trangThai: 1 }).exec();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
})
router.get('/nganhnghe/:id', async (req, res) => {
   
  console.log(req.params.id);
  var _id = (req.params.id).toString();
  try {
    var data = await NganhNghe.findOne({_id:_id})
    console.log(data)
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
})
// router.get('/nganhnghe/:id', async (req, res) => {
//   try {
//     var id =req.body.id;
//      var _id ='"'+id+'"';
//      console.log(req.params.id)
//     const item = await NganhNghe.findOne({_id:_id});
//     if (item === null) {
//       res.json({status: "null"});
//     } else {
//       res.json(item);
//     }
//   } catch (err) {
//     res.json({message: err});
//   }
// })

router.post('/nganhnghe', async (req, res) => {
  const nganh = new  NganhNghe (req.body );
  try {
    var data = await nganh.save();
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

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


router.put('/deletenganhnghe/:id', async (req, res) => {
  try {
    var data = await NganhNghe.findByIdAndUpdate(req.params.id, { "trangThai": 0 }, req.params.idoptions, req.params.id.callback)
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});
 module.exports = router;
