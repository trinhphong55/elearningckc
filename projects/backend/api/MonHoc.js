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
    const dsMonHoc = await MonHoc.find({ trangThai: { $ne: 0 } });
    return res.json(dsMonHoc);
  } catch (err) {
    return res.json({ message: err });
  }
})

router.get('/trangthai/:trangThai', async (req, res) => {
  const trangThai = req.params.trangThai;
  await MonHoc.find({ trangThai }, {}, { sort: { 'created_at': -1 } })
    .then(dsMonHoc => {
      dsmh = [];
      dsMonHoc.forEach(mh => {
        let mhObject = mh.toObject();
        mhObject.tenMonHocKhongDau = nonAccentVietnamese(mh.tenMonHoc);
        dsmh.push(mhObject);
      })
      return res.status(200).json({
        status: 200,
        data: dsmh,
      })
    })
    .catch(err => {
      return res.status(500).json({
        status: 500,
        message: err,
      })
    })
})

router.get('/malophoc/:maLopHoc/hocki/:hocKi', async (req, res) => {
  const maLopHoc = req.params.maLopHoc;
  const hocKi = req.params.hocKi;
  let dsLHP;
  let dsMonHoc = [];

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
    await GVLHP.findOne({ maLopHocPhan: lhp.maLopHocPhan, maGiaoVien: { $ne: "null" } })
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
  // console.log(req.body);
  let items = req.body;
  // let failItems = [];

  let success_num = 0;

  //Get next maMonHoc
  let maMonHoc = await getNextNumber();
  let numMaMonHoc = parseInt(maMonHoc);

  await asyncForEach(items, async mh => {
    await MonHoc.findOne({ tenMonHoc: mh.tenMonHoc }).exec().then((data) => {
      if (data === null) {
        let stringMaMonHoc = "000" + numMaMonHoc;
        mh.maMonHoc = stringMaMonHoc.slice(stringMaMonHoc.length - 4, stringMaMonHoc.length);
        numMaMonHoc++;
        monHoc = new MonHoc(mh);
        success_num++;
        monHoc.save();
        mh.success = true;
      } else {
        // failItems.push(mh);
        mh.success = false;
      }
    });
  });
  console.log(items);
  console.log(success_num);
  if (success_num === 0) {
    return res.json({
      message: "Tất cả môn học trong danh sách đã tồn tại",
      status: 401,
      data: items,
    })
  } else {
    if (success_num === items.length) {
      return res.json({
        message: "Import danh sách môn học thành công",
        status: 200,
        data: items,
      })
    }
    else {
      let fail_num = items.length - success_num;
      return res.json({
        message: `Import thành công ${success_num} môn học và ${fail_num} môn học đã tồn tại`,
        status: 200,
        data: items,
      })
    }
  }

});


//POST MONHOC
router.post('/', async (req, res) => {
  const { tenMonHoc, tenVietTat, maLoaiMonHoc } = req.body;

  if (!tenMonHoc) {
    return res.json({
      message: "ten mon hoc khong ton tai",
      status: 401,
    });
  }

  nameExist = await isNameExist(tenMonHoc);
  if (!nameExist) {
    return res.json({
      message: "ten mon hoc da ton tai",
      status: 401,
    });
  }

  maMonHoc = await getNextNumber();
  const monHoc = new MonHoc({ maMonHoc, tenMonHoc, tenVietTat, maLoaiMonHoc });
  monHoc.save().then(() => {
    return res.json({
      message: "added MonHoc",
      status: 200,
    });
  }).catch(err => {
    return res.status(500).json({
      status: 500,
      message: err,
    })
  });
});


//SPECIFIC MONHOC
router.get('/:maMonHoc', async (req, res) => {
  try {
    const item = await MonHoc.findOne({ maMonHoc: req.params.maMonHoc });
    if (item === null) {
      return res.json({ status: "null" });
    } else {
      return res.json(item);
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err,
    })
  }
})

router.get('maLoaiMonHoc/:maMonHoc', async (req, res) => {
  try {
    const item = await MonHoc.findOne({ maMonHoc: req.params.maMonHoc });
    if (item === null) {
      return res.json({ status: "null" });
    } else {
      return res.json(item.maLoaiMonHoc);
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err,
    })
  }
})

//DELETE MONHOC
router.delete('/:maMonHoc', async (req, res) => {
  isExisted = await isExistedInKHDT(req.params.maMonHoc);
  if (isExisted) {
    return res.json({
      status: 401,
      message: "Mon hoc nay da co trong KHDT, khong duoc xoa de tranh sai sot",
    });
  }
  await MonHoc.updateOne(
    { maMonHoc: req.params.maMonHoc },
    { $set: { trangThai: 0 } })
    .then(() => {
      return res.status(200).json({
        status: 200,
        message: "Xoa mon hoc thanh cong",
      });
    })
    .catch(err => {
      return res.status(500).json({
        status: 500,
        message: err,
      })
    })
})

//UPDATE MONHOC
router.put('/:maMonHoc', async (req, res) => {
  isExisted = await isExistedInKHDT(req.params.maMonHoc);
  if (isExisted) {
    return res.json({
      status: 401,
      message: "Mon hoc nay da co trong KHDT, khong duoc chinh sua de tranh sai sot",
    });
  }
  const { maMonHoc } = req.params;
  const { tenMonHoc, tenVietTat, maLoaiMonHoc } = req.body;
  await MonHoc.updateOne(
    { maMonHoc: maMonHoc },
    { $set: { tenMonHoc, tenVietTat, maLoaiMonHoc } }
  ).then(() => {
    return res.status(200).json({
      status: 200,
      message: "Cap nhat thanh cong",
    });
  }).catch(err => {
    return res.status(500).json({
      status: 500,
      message: err,
    })
  });
})

//RESTORE MONHOC
router.put('/settrangthai/:maMonHoc', async (req, res) => {
  const maMonHoc = req.params.maMonHoc;
  await MonHoc.updateOne(
    { maMonHoc: maMonHoc },
    { $set: { trangThai: 1 } }
  ).then(() => {
    return res.status(200).json({
      status: 200,
      message: "Phuc hoi thanh cong",
    });
  }).catch(err => {
    return res.status(500).json({
      status: 500,
      message: err,
    })
  });
})

function nonAccentVietnamese(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
  str = str.replace(/\u02C6|\u0306|\u031B/g, "");
  return str;
}

module.exports = router;
