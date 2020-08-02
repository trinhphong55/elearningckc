const mongoose = require('mongoose');
var Bac = require("../models/Bac.model");
const { json } = require('body-parser');
const router = require('express').Router();

router.get('/bac', async (req, res) => {
  try {
    var data = await Bac.find({ trangThai:1}).exec();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
})

router.get('/bac/:maBac', async (req, res) => {
  try {
    var data = await Bac.findOne({maBac:req.params.maBac}).exec();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
})
module.exports = router;