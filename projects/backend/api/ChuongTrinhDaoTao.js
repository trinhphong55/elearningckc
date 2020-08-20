const router = require('express').Router();
const CTDT = require('../models/ChuongTrinhDaoTao.model');


//GET CTDT
router.get('/', async (req, res) => {
  await CTDT.find( {trangThai: { $ne: 0 } } )
    .then(ds => res.json(ds)) //return [] neu khong co gi trong db
    .catch(err => res.json( { message: err } ));
})


//POST CTDT
router.post('/', async (req, res) => {

  // nameExist = await isNameExist(req.body.tenCTDT);
  // if (!nameExist) {
  //   return res.json( {error: "ten mon hoc da ton tai"} );
  // }
  const soHocKi = parseInt(req.body.soHocKi);
  const chiTieu = parseInt(req.body.chiTieu);
  const { maChuongTrinhDaoTao, maBac, maNganhNghe, khoaHoc, maLoaiHinhDaoTao } = req.body;
  const ctdt = new CTDT({ maChuongTrinhDaoTao, maBac, maNganhNghe, khoaHoc, maLoaiHinhDaoTao, soHocKi, chiTieu });
  // console.log(ctdt);
  ctdt.save().then(() => {
    res.json({ success: "added CTDT" });
  }).catch(err => {
    res.json( {message: err});
  });
});


//SPECIFIC CTDT
router.get('/:maChuongTrinhDaoTao', async (req, res) => {
  await CTDT.findOne({ maChuongTrinhDaoTao: req.params.maChuongTrinhDaoTao })
    .then(ctdt => {
      if (ctdt === null) {
        res.json( {data: 'null'} );
      } else {
        res.json(ctdt);
      }
    })
    .catch(err => {
      res.json({message: err});
    })
});

router.get('/get/one', async (req, res) => {
  await CTDT.findOne( {trangThai: { $ne: 0 } } )
  .then(ds => res.json([])) //return [] neu khong co gi trong db
  .catch(err => res.json( { message: err } ));
})

//DELETE CTDT
router.delete('/:maChuongTrinhDaoTao', async (req, res) => {
  res.json('oke');
})

//UPATE CTDT
router.put('/:maChuongTrinhDaoTao', async (req, res) => {
  res.json('oke');
});


router.patch('/:maChuongTrinhDaoTao', async (req, res) => {
  try {
    const deletedCTDT = await CTDT.updateOne(
      { maChuongTrinhDaoTao: req.params.maChuongTrinhDaoTao },
      { $set: { trangthai: 0 } }
    );
    res.json(deletedCTDT);
  } catch (error) {
    res.json({ message: error });
  }
})

module.exports = router;
