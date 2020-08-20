const router = require("express").Router();
const KHDT = require("../models/KeHoachDaoTao.model");
const CTDT = require("../models/ChuongTrinhDaoTao.model");

const { asyncForEach } = require("../utils/KeHoachDaoTao.util");

router.get("/", async (req, res) => {
  res.json("KHDT API GET");
});

//GET KHDT by maChuongTrinhDaoTao and hocKi
router.get("/ctdt/:maChuongTrinhDaoTao/hocki/:hocKi", async (req, res) => {
  let maCTDT = req.params.maChuongTrinhDaoTao;
  let hocKi = req.params.hocKi;
  await KHDT.find({
    trangThai: { $ne: 0 },
    maChuongTrinhDaoTao: maCTDT,
    hocKi: hocKi,
  })
    .then((ds) => res.json(ds)) //return [] neu khong co gi trong db
    .catch((err) => res.json({ message: err }));
});

//POST KHDT
router.post("/", async (req, res) => {
  const dskhdt = req.body.dskhdt;
  const ctdt = req.body.ctdt;
  const hocKi = parseInt(req.body.hocKi);
  // return res.json(dskhdt);

  const { maBac, maNganhNghe, khoaHoc, maLoaiHinhDaoTao } = ctdt;
  const maChuongTrinhDaoTao = maBac + maNganhNghe + khoaHoc + maLoaiHinhDaoTao;

  // if (maChuongTrinhDaoTao.length !== 7) {
  //   return res.json({ error: "Loi CTDT" });
  // }

  await CTDT.findOne({ maChuongTrinhDaoTao })
    .then((item) => {
      if (item === null) {
        const newCTDT = new CTDT({
          maChuongTrinhDaoTao,
          maBac,
          maNganhNghe,
          khoaHoc,
          maLoaiHinhDaoTao,
        });
        newCTDT.save().catch((err) => {
          return res.json({ message: err });
        });
      }
    })
    .catch((err) => {
      return res.json({ message: err });
    });

  await KHDT.updateMany(
    { maChuongTrinhDaoTao, hocKi },
    { $set: { trangThai: 0 } }
  ).catch((err) => {
    return res.json({ status: 501, message: err });
  });

  if (dskhdt.length === 0) {
    return res.json({ status: 200, message: "Luu thanh cong voi 0 KHDT" });
  }

  await KHDT.find({ maChuongTrinhDaoTao }).then(async (items) => {
    if (items.length === 0) {
      KHDT.insertMany(dskhdt).catch((err) => {
        return res.json({ status: 501, message: err });
      });
    } else {
      await asyncForEach(dskhdt, async (khdt, index) => {
        await KHDT.findOneAndUpdate(
          { maDaoTao: khdt.maDaoTao },
          {
            $set: {
              trangThai: 1,
              hocKi,
              maBoMon: khdt.maBoMon,
              loaiTienThu: khdt.loaiTienThu,
              donViHocTrinh: khdt.donViHocTrinh,
              soTietHoc: khdt.soTietHoc,
              soTuan: khdt.soTuan,
              tinh: khdt.tinh,
              xet: khdt.xet,
            },
          }
        ).then((result) => {
          if (result === null) {
            // console.log("Them moi");
            KHDT.create(khdt)
              .then()
              .catch((err) => {
                return res.json({ status: 501, message: err });
              });
          } else {
            // console.log("Cap nhat", result.maDaoTao);
          }
        });
      });
      return res.json({
        status: 200,
        message: "luu ke hoach dao tao thanh cong",
      });
    }
  });
});

//DELETE KHDT
router.delete("/", async (req, res) => {
  KHDT.deleteMany().then(res.json("Done"));
});

//UPATE KHDT
router.put("/:maDaoTao", async (req, res) => {
  res.json("oke");
});

router.patch("/:maDaoTao", async (req, res) => {
  res.json("oke");
});

module.exports = router;
