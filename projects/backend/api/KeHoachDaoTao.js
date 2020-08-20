const router = require("express").Router();
const KHDT = require("../models/KeHoachDaoTao.model");
const CTDT = require("../models/ChuongTrinhDaoTao.model");
const diemSinhVienModel = require("../models/diemsinhvien.model");
const monHocModel = require('../models/MonHoc.model');

const { asyncForEach } = require("../utils/KeHoachDaoTao.util");

router.get("/:maSinhVien", async (req, res) => {
  try {
    const khdt = await KHDT.find({ trangThai: 1 });
    const diemSV = await diemSinhVienModel.find({
      trangThai: 1,
      maSinhVien: req.params.maSinhVien,
    });
    console.log(diemSV);
    const monHoc = await monHocModel.find();
    let khdt_diemtb = [];
    for (let i = 1; i < 7; i++) {
      let diemTB_HocKi = 0;
      let heso = 0;
      let khdt_tmp = [];
      khdt.forEach((kh) => {
        if (kh.hocKi == i) {
          let item = { maMonHoc: kh.maMonHoc, diem: 7 ,tenMonHoc:''};
          diemSV.forEach((diem) => {
            if (diem.maDaoTao == kh.maDaoTao) {
              item.diem = diem.diem;
            }

          });
          diemTB_HocKi = diemTB_HocKi + item.diem;
          heso++;
          monHoc.forEach(mh => {
            if(mh.maMonHoc === item.maMonHoc){
              item.tenMonHoc = mh.tenMonHoc;
            }
          })
          khdt_tmp.push(item);
        }
      });

      khdt_diemtb.push({
        hocKi: i,
        diem: diemTB_HocKi!= 0?Math.round(((diemTB_HocKi/heso) + Number.EPSILON) * 100) / 100:0,
        khdt: khdt_tmp,
        count: khdt_tmp.length,
      });
    }

    res.json({
      data: khdt_diemtb,
      message: "Lấy thành công",
    });
  } catch (error) {
    res.json(error);
  }
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
