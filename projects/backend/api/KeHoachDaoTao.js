const router = require('express').Router();
const KHDT = require('../models/KeHoachDaoTao.model');
const CTDT = require('../models/ChuongTrinhDaoTao.model');

const { asyncForEach } = require('../utils/KeHoachDaoTao.util');


router.get('/', async(req, res) => {
  res.json('KHDT API GET');
})


//GET KHDT by maChuongTrinhDaoTao and hocKi
router.get('/ctdt/:maChuongTrinhDaoTao/hocki/:hocKi', async(req, res) => {
  let maCTDT = req.params.maChuongTrinhDaoTao;
  let hocKi = req.params.hocKi;
  await KHDT.find( {trangThai: { $ne: 0 }, maChuongTrinhDaoTao : maCTDT, hocKi: hocKi } )
  .then(ds => res.json(ds)) //return [] neu khong co gi trong db
  .catch(err => res.json( { message: err } ));
})


//POST KHDT
router.post('/', async (req, res) => {

  const dskhdt = req.body[1];
  const ctdt = req.body[0];
  // return res.json(dskhdt);

  const { maBac, maNganhNghe, khoaHoc, maLoaiHinhDaoTao } = ctdt;
  const maChuongTrinhDaoTao = maBac + maNganhNghe + khoaHoc + maLoaiHinhDaoTao;
  var hocKi;

  // if (maChuongTrinhDaoTao.length !== 7) {
  //   return res.json({ error: "Loi CTDT" });
  // }

  await CTDT.findOne({ maChuongTrinhDaoTao })
    .then(item => {
      if (item === null) {
        const newCTDT = new CTDT({ maChuongTrinhDaoTao, maBac, maNganhNghe, khoaHoc, maLoaiHinhDaoTao });
        newCTDT.save()
        .catch(err => {
          return res.json( {message: err});
        });
      }
    })
    .catch(err => {
      return res.json( {message: err});
    })

  if (dskhdt.length === 0) {
    return res.json({ error: 'Chua co du lieu KHDT' });
  }

  hocKi = dskhdt[0].hocKi;

  await KHDT.find({ maChuongTrinhDaoTao })
    .then(async items => {
      if (items.length === 0) {
        KHDT.insertMany(dskhdt).catch((err) => {
          return res.json( {message: err});
        })
      }
      else {
        await KHDT.updateMany({ maChuongTrinhDaoTao, hocKi }, {$set: {trangThai: 0 } } )
          .catch(err => {
            return res.json( {message: err});
          })
        await asyncForEach(dskhdt, async (khdt, index) => {
          await KHDT.findOne({ maDaoTao: khdt.maDaoTao }).exec().then((data) => {
            if (data === null) {
              KHDT.create(khdt)
                .then(console.log("added " + khdt.maDaoTao))
                .catch(err => {
                  return res.json( {message: err} );
                })
            }
            else {
              KHDT.updateOne({ maDaoTao: khdt.maDaoTao },
                {$set: {trangThai: 1, hocKi, maBoMon: khdt.maBoMon,
                  loaiTienThu: khdt.loaiTienThu, donViHocTrinh: khdt.donViHocTrinh,
                  soTietHoc: khdt.soTietHoc, soTuan: khdt.soTuan,
                  tinh: khdt.tinh, xet: khdt.xet } } )
              .then(console.log("updated " + khdt.maDaoTao))
              .catch(err => {
                return res.json( {message: err});
              });
            }
          });
        });
        return res.json({success: 'luu ke hoach dao tao thanh cong'});
      }
    })
});


//DELETE KHDT
router.delete('/', async (req, res) => {
  KHDT.deleteMany().then(res.json('Done'));
})

//UPATE KHDT
router.put('/:maDaoTao', async (req, res) => {
  res.json('oke');
});


router.patch('/:maDaoTao', async (req, res) => {
  res.json('oke');
})

module.exports = router;
