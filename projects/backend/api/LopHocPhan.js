const router = require("express").Router();
const LopHocPhan = require("../models/LopHocPhan.model");
const KHDT = require("../models/KeHoachDaoTao.model");
const MonHoc = require("../models/MonHoc.model");
const GVLHP = require("../models/GiaoVienLopHocPhan.model");
const SINHVIEN = require("../models/sinh-vien.model");
const GiaoVienDAO = require('../DAO/GiaoVienDAO');
const giaoVienDAO = new GiaoVienDAO();

const { asyncForEach } = require("../utils/MonHoc.util");

//GET LHP, loaimonhoc, giaovienlhp by maCTDT and hocKi with loaiMonHoc
router.get("/ctdt/:maCTDT/hocKi/:hocKi", async (req, res) => {
  const maChuongTrinhDaoTao = req.params.maCTDT;
  const hocKi = parseInt(req.params.hocKi);

  let resultView = [];
  let dsMaLoaiMonHoc = [];

  let dsLHP = await LopHocPhan.find({
    trangThai: { $ne: 0 },
    maLopHoc: { $regex: maChuongTrinhDaoTao },
    hocKi,
  }).catch((err) => {
    return res.json({ message: err });
  });

  await asyncForEach(dsLHP, async (lhp, index) => {
    let maMonHoc = lhp.maDaoTao.slice(lhp.maDaoTao.length - 4);
    await MonHoc.findOne({ maMonHoc })
      .then((mh) => {
        if (mh !== null) {
          dsMaLoaiMonHoc.push(mh.maLoaiMonHoc);
        } else {
          dsMaLoaiMonHoc.push("null mh");
        }
      })
      .catch((err) => {
        return res.json({ message: err });
      });
  });

  //danh sach giao vien lhp kem theo lhp
  await asyncForEach(dsLHP, async (lhp, index) => {
    await GVLHP.findOne({ maLopHocPhan: lhp.maLopHocPhan }).then((gvlhp) => {
      let a = { maGiaoVien: "null", ghiChu: "" };
      if (gvlhp !== null) {
        a = { maGiaoVien: gvlhp.maGiaoVien, ghiChu: gvlhp.ghiChu };
      }
      let result = lhp.toObject();
      result.maLoaiMonHoc = dsMaLoaiMonHoc[index];
      result.maGiaoVien = a.maGiaoVien;
      result.ghiChu = a.ghiChu;
      resultView.push(result);
    });
  });

  return res.json(resultView);
});

//trịnh phong sua
router.get("/", async (req, res) => {
  var data = await LopHocPhan.find({trangThai:1}).exec();
  res.json(data);
});

//POST LopHocPhan
router.post("/", async (req, res) => {
  let hocKi = req.body[0];
  let dsLopHoc = req.body[1];
  let nextNumber = 1;

  await LopHocPhan.findOne({}, {}, { sort: { ngayTao: -1 } })
    .exec()
    .then((lastLHP) => {
      if (lastLHP !== null) {
        nextNumber = lastLHP.maLopHocPhan + 1;
      }
    });

  if (dsLopHoc === undefined || hocKi === undefined) {
    return res.json({ error: "Chua co Lop hoc" });
  }

  const maChuongTrinhDaoTao = dsLopHoc[0].maLopHoc.slice(0, 7);
  console.log(maChuongTrinhDaoTao);

  await KHDT.find({ maChuongTrinhDaoTao, hocKi, trangThai: { $ne: 0 } })
    .then((ds) => (dsKHDT = ds))
    .catch((err) => {
      return res.json({ message: err });
    });

  if (dsKHDT.length === 0) {
    return res.json({
      error: "Chuong trinh dao tao nay chua co ke hoach dao tao",
    });
  }

  let dsLHP = [];
  let lophocphan;
  let soLopHocPhan = dsLopHoc.length * dsKHDT.length;

  //tao danh sach lop hoc phan chua co maLopHocPhan va tenLopHocPhan
  dsLopHoc.forEach((lh) => {
    dsKHDT.forEach((khdt) => {
      lophocphan = {
        tenLopHocPhan: lh.tenVietTat,
        maLopHoc: lh.maLopHoc,
        maDaoTao: khdt.maDaoTao,
        hocKi,
      };
      dsLHP.push(lophocphan);
    });
  });


  //kiem tra da ton tai trong database
  await asyncForEach(dsLHP, async (lhp, index) => {
    await LopHocPhan.findOne({
      maDaoTao: lhp.maDaoTao,
      maLopHoc: lhp.maLopHoc,
    }).then((data) => {
      if (data === null) {
        lhp.maLopHocPhan = nextNumber;
        nextNumber++;
        let maMonHoc = lhp.maDaoTao.slice(lhp.maDaoTao.length - 4);
        MonHoc.findOne({ maMonHoc }).then((mh) => {
          let tenlhp = lhp.tenLopHocPhan;
          lhp.tenLopHocPhan = tenlhp + " - " + mh.tenMonHoc;
          lhp.tenVietTatLopHocPhan = tenlhp + " - " + mh.tenVietTat;
          LopHocPhan.create(lhp)
            .then()
            .catch((err) => {
              return res.json({ message: err });
            });
        });
      } else {
        soLopHocPhan--;
        // Future Features -- Truong hop neu tao it hon so lan tao lan truoc
        // LopHocPhan.updateOne({ maDaoTao: LopHocPhan.maDaoTao },
        //   {$set: {trangThai: 1, hocKi, maBoMon: LopHocPhan.maBoMon,
        //     loaiTienThu: LopHocPhan.loaiTienThu, donViHocTrinh: LopHocPhan.donViHocTrinh,
        //     soTietHoc: LopHocPhan.soTietHoc, soTuan: LopHocPhan.soTuan,
        //     tinh: LopHocPhan.tinh, xet: LopHocPhan.xet } } )
        // .then(console.log("updated " + LopHocPhan.maDaoTao))
        // .catch(err => {
        //   return res.json( {message: err});
        // });
      }
    });
  });
  if (soLopHocPhan === dsLHP.length) {
    return res.json({
      success: `Them moi thanh cong ${soLopHocPhan} lop hoc phan`,
    });
  } else if (soLopHocPhan === 0) {
    return res.json({ success: "Khong co gi thay doi" });
  } else {
    return res.json({ success: `Cap nhat them ${soLopHocPhan} lop hoc phan` });
  }
});

//DELETE LopHocPhan
router.delete("/:maDaoTao", async (req, res) => {
  res.json("oke");
});

//UPATE LopHocPhan
router.put("/:maDaoTao", async (req, res) => {
  res.json("oke");
});

router.get("/malophocphan/:maLopHocPhan", async (req, res) => {
  try {
    const lopHocPhans = await LopHocPhan.find({
      maLopHocPhan: req.params.maLopHocPhan,
    });
    res.json(lopHocPhans);
  } catch (error) {
    res.json(error);
  }
});

router.get("/cunggiaovien/malophocphan/:maLopHocPhan", async (req, res) => {
  const maLopHocPhan = parseInt(req.params.maLopHocPhan);
  let maGiaoVien = "null";
  let dsGVLHPbymaGiaoVien;
  let dsLHP = [];

  await GVLHP.findOne({ maLopHocPhan, maGiaoVien: { $ne: "null" } })
    .then(gvlhp => {
      if (gvlhp !== null) {
        maGiaoVien = gvlhp.maGiaoVien;
      }
    }).catch(err => {
      return res.status(501).json({
        message: err,
        status: 501,
      })
    });

  if (maGiaoVien === "null") {
    return res.status(401).json({
      message: "Lop hoc phan nay khong co that trong database",
      status: 401
    })
  }

  await GVLHP.find({ maGiaoVien, status: { $ne: 0 } }).then(data => {
    dsGVLHPbymaGiaoVien = data;
  })

  await asyncForEach(dsGVLHPbymaGiaoVien, async gvlhp => {
    await LopHocPhan.findOne({ maLopHocPhan: gvlhp.maLopHocPhan, trangThai: { $ne: 0 } })
      .then(lhp => {
        // console.log(lhp.maLopHocPhan);
        if (lhp.length !== 0) {
          dsLHP.push(lhp);
        }
      })
      .catch(err => {
        return res.status(501).json({
          message: err,
          status: 501,
        })
      })
  })

  return res.status(200).json(dsLHP);
})

//SEARCH theo maNganh
router.get("/:maLop/search", async (req, res) => {
  try {
    const lopHocPhans = await LopHocPhan.find({ maLopHoc: req.params.maLop });
    res.json(lopHocPhans);
  } catch (error) {
    res.json(error);
  }
});
//SEARCH theo maLopHocPhan
//Nguoi tạo: Trần Đình Huy

router.get("/:maLopHocPhan/malhp", async (req, res) => {
  try {
    const lopHocPhans = await LopHocPhan.findOne({
      maLopHocPhan: req.params.maLopHocPhan,
    });
    res.json({
      id: req.params.maLopHocPhan,
      data: lopHocPhans,
      message: "Lấy thành công",
      status: 200,
    });
  } catch (error) { }
});
//magv=> lopHp
router.get("/:email/giaovienlophocphan", async (req, res) => {
  try {
    let result = await giaoVienDAO.layThongTinGiaoVienTheoEmail(req.params.email);
    var dt = await GVLHP.find({trangThai:1});
    var data = await LopHocPhan.find({trangThai:1});
    var a = [];
    result.forEach(async z => {
      dt.forEach(async x => {
        data.forEach(async y => {
          if (x.maGiaoVien == z.maGiaoVien) {
            if (x.maLopHocPhan == y.maLopHocPhan) {
              a.push(y);
            }
          }
        });
      });
    })
    res.json(a);
  } catch (error) {
    res.json(error);
  }
});
///tim lop hoc phan theo email sinhvien
//magv=> lopHp
router.get("/:email/sinhvienlophocphan", async (req, res) => {
  try {
    let result = await SINHVIEN.find({email:req.params.email});
    var data = await LopHocPhan.find({trangThai:1});
    var a = [];
    result.forEach(async x => {
      data.forEach(async y => {
        if (x.maLopHoc == y.maLopHoc) {
          a.push(y);
        }
      });
    })
    res.json(a);
  } catch (error) {
    res.json(error);
  }
});
//tim mssv =>lophp //trinhphong
router.get("/:maSinhVien/sinhvien", async (req, res) => {
  try {
    var dt = await SINHVIEN.findOne({ maSinhVien: req.params.maSinhVien });
    var data = await LopHocPhan.find({ maLopHoc: dt.maLopHoc })
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

///ti

// ***  API for team App Android  ***

router.get("/android/malophoc/:maLopHoc", async (req, res) => {
  let dsLHP = [];
  let result = [];
  const maLopHoc = req.params.maLopHoc;

  await LopHocPhan.find({ maLopHoc })
    .then((ds) => {
      dsLHP = ds;
    })
    .catch((err) => {
      return res.status(500).json({
        message: err,
        data: [],
        status: 500,
      });
    });

  await asyncForEach(dsLHP, async (lhp, index) => {
    let maMonHoc = lhp.maDaoTao.slice(lhp.maDaoTao.length - 4);
    let tempResult = {};
    let allowPush = true;
    let maGiaoVien = "null";
    await MonHoc.findOne({ maMonHoc })
      .then((mh) => {
        if (mh.length !== 0) {
          tempResult = {
            hocKi: lhp.hocKi,
            maLopHoc: maLopHoc,
            maMonHoc: mh.maMonHoc,
            tenMonHoc: mh.tenMonHoc,
            trangThai: lhp.trangThai,
            tenVietTat: mh.tenVietTat,
            loaiMonHoc: mh.maLoaiMonHoc,
            maLopHocPhan: lhp.maLopHocPhan,
            soLuongSV: lhp.soLuongSV,
            soLuongSVHocGhep: lhp.soLuongSVHocGhep,
          };
        } else {
          allowPush = false;
        }
      })
      .catch((err) => {
        return res.status(500).json({
          message: err,
          data: [],
          status: 500,
        });
      });
    await GVLHP.findOne({
      maLopHocPhan: lhp.maLopHocPhan,
      trangThai: { $ne: 0 },
    }).then((gvlhp) => {
      if (gvlhp === null) {
        tenGiaoVien = "Chưa có GVLHP";
      } else {
        maGiaoVien = gvlhp.maGiaoVien;
      }
    });
    if (maGiaoVien !== "null") {
      await giaoVienDAO.layThongTinGiaoVien(maGiaoVien).then((gv) => {
        tenGiaoVien = gv[0].ho + " " + gv[0].ten;
      });
    }
    tempResult.tenGiaoVien = tenGiaoVien;
    if (allowPush) {
      result.push(tempResult);
    }
  });

  return res.status(200).json({
    message: "Lay thanh cong",
    data: result,
    status: 200,
  });
});

module.exports = router;
