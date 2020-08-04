const router = require('express').Router();
const MonHoc = require('../models/MonHoc.model');
const LopHocPhan = require('../models/LopHocPhan.model');
const KHDT = require('../models/KeHoachDaoTao.model');
const GVLHP = require('../models/GiaoVienLopHocPhan.model');
const GiaoVienDAO = require('../DAO/GiaoVienDAO');
const giaoVienDAO = new GiaoVienDAO();


const {
  getNextNumber, isNameExist,
  asyncForEach, isExistedInKHDT
} = require('../utils/MonHoc.util');

//GET MONHOC
router.get('/', async (req, res) => {
  try {
    const dsMonHoc = await MonHoc.find( {trangThai: { $ne: 0 }} );
    return res.json(dsMonHoc);
  } catch (err) {
    return res.json({ message: err });
  }
})

router.get('/malophoc/:maLopHoc/hocki/:hocKi', async (req, res) => {
  const maLopHoc = req.params.maLopHoc;
  const hocKi = req.params.hocKi;
  let dsLHP;
  let dsMonHoc= [];

  await LopHocPhan.find({ maLopHoc, hocKi, trangThai: { $ne: 0 } }).sort({ tenLopHocPhan: 1 }).then(ds => {
    dsLHP = ds;
  });

  await asyncForEach(dsLHP, async (lhp, index) => {
    let maMonHoc = lhp.maDaoTao.slice(lhp.maDaoTao.length - 4);
    let tenMonHocVietTat = lhp.tenVietTatLopHocPhan.split("-")[1].trim();
    let maGiaoVien = "null";
    let DVHT = 0;
    let tenGiaoVien = "null"
    await KHDT.findOne({ maDaoTao: lhp.maDaoTao })
      .then(khdt => {
        DVHT = khdt.donViHocTrinh;
      });
    await GVLHP.findOne({ maLopHocPhan: lhp.maLopHocPhan, trangThai: { $ne: 0 } })
      .then(gvlhp => {
        if (gvlhp === null) {
          tenGiaoVien = "Chưa có GVLHP";
        } else {
          maGiaoVien = gvlhp.maGiaoVien;
        }
      });
    if (maGiaoVien !== "null") {
      await giaoVienDAO.layThongTinGiaoVien(maGiaoVien).then(gv => {
        tenGiaoVien = gv[0].ho + " " + gv[0].ten;
      })
    }
    let tenMonHoc = tenMonHocVietTat + " / " + `${DVHT}` + " - " + tenGiaoVien;
    dsMonHoc.push({ maMonHoc, tenMonHoc });
  });
  return res.json(dsMonHoc);
});

//IMPORT EXCEL
router.post('/importexcel', async (req, res) => {
  var items = req.body;
  var filterItems = [];

  //Get next maMonHoc
  var maMonHoc = await getNextNumber();
  var numMaMonHoc = parseInt(maMonHoc);

  await asyncForEach(items, async (mh, index) => {
    await MonHoc.findOne({ tenMonHoc: mh.tenMonHoc }).exec().then((data) => {
      if (data === null) {
        let stringMaMonHoc = "000" + numMaMonHoc;
        mh.maMonHoc = stringMaMonHoc.slice(stringMaMonHoc.length - 4, stringMaMonHoc.length);
        numMaMonHoc++;
        filterItems.push(mh);
      }
    });
  });

  if (filterItems.length > 0) {
    MonHoc.insertMany(filterItems).then(() => {
      return res.json({ success: "added MonHoc from Excel" });
    }).catch((err) => {
      return res.json( {message: err});
    })
  } else {
    return res.json( {error: "du lieu trong hoac da ton tai"})
  }
});


//POST MONHOC
router.post('/', async (req, res) => {

  nameExist = await isNameExist(req.body.tenMonHoc);
  if (!nameExist) {
    return res.json( {error: "ten mon hoc da ton tai"} );
  }

  maMonHoc = await getNextNumber();
  const { tenMonHoc, tenVietTat, maLoaiMonHoc } = req.body;
  const monHoc = new MonHoc({ maMonHoc, tenMonHoc, tenVietTat, maLoaiMonHoc });
  monHoc.save().then(() => {
    return res.json({ success: "added MonHoc" });
  }).catch(err => {
    return res.json( {message: err});
  });
});


//SPECIFIC MONHOC
router.get('/:maMonHoc', async (req, res) => {
  try {
    const item = await MonHoc.findOne({ maMonHoc: req.params.maMonHoc });
    if (item === null) {
      return res.json({status: "null"});
    } else {
      return res.json(item);
    }
  } catch (err) {
    return res.json({message: err});
  }
})

router.get('maLoaiMonHoc/:maMonHoc', async (req, res) => {
  try {
    const item = await MonHoc.findOne({ maMonHoc: req.params.maMonHoc });
    if (item === null) {
      return res.json({status: "null"});
    } else {
      return res.json(item.maLoaiMonHoc);
    }
  } catch (err) {
    return res.json({message: err});
  }
})

//DELETE MONHOC
router.delete('/:maMonHoc', async (req, res) => {
  isExisted = await isExistedInKHDT(req.params.maMonHoc);
  if (isExisted) {
    return res.json({ error: 'Mon hoc nay da ton tai rong KHDT'});
  }
  await MonHoc.updateOne(
      { maMonHoc: req.params.maMonHoc },
      { $set: { trangThai: 0 } })
    .then(removedMonhoc => {
      console.log(removedMonhoc);
      return res.json(removedMonhoc);
    })
    .catch(err => {
      return res.json( {message: err} );
    })

})

//UPDATE MONHOC
router.put('/:maMonHoc', async (req, res) => {
  console.log('du lieu chua update', req.body);
  const { maMonHoc } = req.params;
  const { tenMonHoc, tenVietTat, maLoaiMonHoc } = req.body;
  await MonHoc.updateOne(
      { maMonHoc: maMonHoc },
      { $set: { tenMonHoc, tenVietTat, maLoaiMonHoc } }
  ).then(() => {
    return res.json({ success: "updated MonHoc" });
  }).catch(err => {
    return res.json({ message: err });
  });
})

module.exports = router;
