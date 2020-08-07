const router = require("express").Router();
// const LopHocPhan = require("../models/LopHocPhan.model");
const GVLHP = require("../models/GiaoVienLopHocPhan.model");

//trinh phong
router.get("/", async (req, res) => {
  var data =await GVLHP.find()
  res.json(data);
});

router.post("/", async (req, res) => {
  const maGiaoVien = req.body[0];
  const maLopHocPhan = parseInt(req.body[1]);
  await GVLHP.findOneAndUpdate({ maLopHocPhan }, { $set: { maGiaoVien } })
    .then((result) => {
      if (result !== null) {
        console.log('Cap nhat');
        return res.json({
          status: 200,
          data: [],
          message: "Cap nhat thanh cong",
        });
      } else {
        console.log('Them moi');
        let newGVLHP = new GVLHP({ maGiaoVien, maLopHocPhan });
        newGVLHP.save().catch((err) => {
          return res.json({ status: 401, data: [], message: err });
        });
        return res.json({
          status: 200,
          data: [],
          message: "Them moi thanh cong",
        });
      }
    })
    .catch((err) => console.log(err));
});
//trinh phong
router.post('/giaovienlophocphan', async (req, res) => {
  try {
    const gvhp = new GVLHP(req.body);
      var data = await gvhp.save();
      res.status(201).json({ data });
     
       }
   catch (error) {
    return error;
  }
});

//tim lop hp theo a giao vien
router.get("/:maGiaoVien", async (req, res) => {

  var data =await GVLHP.find({maGiaoVien:req.params.maGiaoVien}).exec()
  res.json(data);
});

module.exports = router;
