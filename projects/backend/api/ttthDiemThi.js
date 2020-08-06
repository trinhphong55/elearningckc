const router = require('express').Router()
const ttthdiemthi = require('../models/ttthdiemthi.model');
const multer = require('multer')

//IMPORT EXCEL
router.post('/importdiemthi', async (req, res) => {
  var items = req.body;
  if (items.length > 0) {
    ttthdiemthi.insertMany(items).then(() => {
    })
  } else {
    return res.json( {error: "Dữ liệu trống hoặc không đúng định dạng"})
  }
});
//tra cuu diem
router.get("/tracuudiem=:query", async (req, res) => {
  try {
    const newRegExp = (pattern) => new RegExp(`.*${pattern}.*`);
    const regexQuery = newRegExp(req.params.query);
    const data = await ttthdiemthi.find({
      mssv: { $regex: regexQuery, $options: "i" }, // i: không phân biệt chữ hoa & thường
    });
    res.json(data);
  } catch (error) {

  }
});

module.exports = router
