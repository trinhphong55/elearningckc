const router = require("express").Router();
const LopHocPhan = require("../models/LopHocPhan.model");
const KHDT = require("../models/KeHoachDaoTao.model");

//GET LHP
// router.get("/", async (req, res) => {
//   return res.send("haha");
// });
//GET LHP by hocKi
router.get('/:hocKi', async(req, res) => {
  const hocKi = req.params.hocKi;
  await LopHocPhan.find({ trangThai: { $ne: 0 }, hocKi })
    .then(dslhp => res.json(dslhp))
    .catch(err => res.json({ message: err }));
})

//GET LHP by hocKi
router.get('/chuaphancong/:hocKi', async(req, res) => {
  const hocKi = req.params.hocKi;
  await LopHocPhan.find({ trangThai: { $e: 1 }, hocKi })
    .then(dslhp => res.json(dslhp))
    .catch(err => res.json({ message: err }));
})

// router.get('/daphancong/:hocKi/giaovien/:maGiaoVien/loai/:loai', async(req, res) => {
//   const hocKi = req.params.hocKi;
//   const loai = req.params.loai;
//   const maGiaoVien = req.params.maGiaoVien;
//   await LopHocPhan.find({ trangThai: { $e: 2 }, hocKi })
//     .then(dslhp => res.json(dslhp))
//     .catch(err => res.json({ message: err }));
// })

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

  // let dsLopHoc = [
  //   { tenLop: 'CĐ TH 17B', maLopHoc: '30061712' },
  //   { tenLop: 'CĐ TH 17C', maLopHoc: '30061713' },
  //   { tenLop: 'CĐ TH 17A', maLopHoc: '30061711' },
  //   { tenLop: 'CĐ TH 17D', maLopHoc: '30061714' },
  // ];

  // let hocKi = 1;

  //neu dsLopHoc rong?
  if (dsLopHoc.length === 0) {
    return res.json({ error: "Chua co Lop hoc" });
  }

  const maChuongTrinhDaoTao = dsLopHoc[0].maLopHoc.slice(0, 7);
  // let dsKHDT = [
  //   { maDaoTao: "30061710003" },
  //   { maDaoTao: "30061710001" },
  // ];
  await KHDT.find({ maChuongTrinhDaoTao, hocKi, trangThai: { $ne: 0 } })
    .then((ds) => (dsKHDT = ds))
    .catch((err) => {
      return res.json({ message: err });
    });
  //neu dsKHDT rong?
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
        tenLopHocPhan: lh.tenLop,
        maLopHoc: lh.maLopHoc,
        maDaoTao: khdt.maDaoTao,
        hocKi,
      };
      dsLHP.push(lophocphan);
    });
  });

  //kiem tra da ton tai trong database
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index);
    }
  }
  await asyncForEach(dsLHP, async (lhp, index) => {
    await LopHocPhan.findOne({ maDaoTao: lhp.maDaoTao, maLopHoc: lhp.maLopHoc })
      .exec()
      .then((data) => {
        if (data === null) {
          lhp.tenLopHocPhan = lhp.tenLopHocPhan + " " + nextNumber.toString();
          lhp.maLopHocPhan = nextNumber;
          nextNumber++;
          console.log(lhp);
          LopHocPhan.create(lhp)
            .then(console.log("added " + lhp.maDaoTao))
            .catch((err) => {
              return res.json({ message: err });
            });
        } else {
          soLopHocPhan--;
          // Future Features
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

//SPECIFIC LopHocPhan
// router.get('/:maDaoTao', async (req, res) => {
//   // try {
//   //   const item = await MonHoc.findOne({ maLopHocPhan: req.params.maLopHocPhan });
//   //   if (item === null) {
//   //     res.json({status: "null"});
//   //   } else {
//   //     res.json(item);
//   //   }
//   // } catch (err) {
//   //   res.json({message: err});
//   // }
//   res.json('oke');
// })

//DELETE LopHocPhan
router.delete("/:maDaoTao", async (req, res) => {
  res.json("oke");
});

//UPATE LopHocPhan
router.put("/:maDaoTao", async (req, res) => {
  res.json("oke");
});

router.patch("/:maDaoTao", async (req, res) => {
  res.json("oke");
});
//SEARCH theo maNganh
router.get("/:maLop/search", async (req, res) => {
  try {
    const lopHocPhans = await LopHocPhan.find({ maLopHoc : req.params.maLop});
    res.json(lopHocPhans);
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
