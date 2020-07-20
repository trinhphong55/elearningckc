const mongoose = require('mongoose');
var NganhNghe = require("../models/NganhNghe.model");
var Bac = require("../models/Bac.model");
const { json } = require('body-parser');
const router = require('express').Router();

router.get('/nganhnghe', async (req, res) => {
  try {
    var data = await NganhNghe.find({ trangThai: 1 }).exec();
    console.log(data);
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
})
router.get('/nganhnghe/:id', async (req, res) => {
  try {
    var data = await NganhNghe.findById(req.params.id).exec();
    res.json(data);
    console.log(data);
  } catch (error) {
    res.json({ message: error });
  }
})
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

router.put('/nganhnghe/:id', async (req, res) => {
  try {
    await NganhNghe.findByIdAndUpdate(req.params.id, req.body);
    await NganhNghe.save()
  } catch (err) {
    res.status(500).send(err)
  }
})

router.put('/deletenganhnghe/:id', async (req, res) => {
  try {
    var data = await NganhNghe.findByIdAndUpdate(req.params.id, { "trangThai": 0 }, req.params.idoptions, req.params.id.callback)
    res.json(data);
    console.log(data);
  } catch (error) {
    res.json({ message: error });
  }
});
 module.exports = router;
