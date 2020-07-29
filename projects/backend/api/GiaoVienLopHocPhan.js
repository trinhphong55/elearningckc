const router = require("express").Router();
const LopHocPhan = require("../models/LopHocPhan.model");
const GVLHP = require("../models/GiaoVienLopHocPhan.model");

router.get("/", async (req, res) => {
  res.json("Get GVLHP");
});

router.get("/gvdd/:maGiaoVien/hocki/:hocKi", async (req, res) => {
  const maGiaoVien = req.params.maGiaoVien;
  const hocKi = parseInt(req.params.hocKi);
  let dsmaLHPbyGiaoVien = [];
  let dsGVLHP;

  await GVLHP.find({ trangThai: { $ne: 0 }, loai: "Giảng dạy", maGiaoVien, hocKi })
    .then((ds) => {
      if (ds.length === 0) {
        return res.json({ data: [] });
      }
      else {
        dsGVLHP = ds;
      }
    })
    .catch((err) => res.json({ message: err }));

  dsGVLHP.forEach(item => {
    dsmaLHPbyGiaoVien.push(item.maLopHocPhan);
  })

  await LopHocPhan.find({ maLopHocPhan: dsmaLHPbyGiaoVien })
    .then(dslhp => {
      if (dslhp.length === 0) {
        return res.json({ data: [] });
      }
      else {
        return res.json({ data: dslhp });
      }
    })
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
