const router = require('express').Router();
const MonHoc = require('../models/MonHoc.model');

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
    return res.json({message: err});
  }
})

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
  const { tenMonHoc, tenVietTat, maLoaiMonHoc, tenTiengAnh, tenVietTatTiengAnh } = req.body;
  const monHoc = new MonHoc({ maMonHoc, tenMonHoc, tenVietTat, maLoaiMonHoc, tenTiengAnh, tenVietTatTiengAnh });
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
  const { tenMonHoc, tenVietTat, maLoaiMonHoc, tenTiengAnh, tenVietTatTiengAnh } = req.body;
  await MonHoc.updateOne(
      { maMonHoc: maMonHoc },
      { $set: { tenMonHoc, tenVietTat, maLoaiMonHoc, tenTiengAnh, tenVietTatTiengAnh } }
  ).then(() => {
    return res.json({ success: "updated MonHoc" });
  }).catch(err => {
    return res.json({ message: err });
  });
})
// router.patch('/:maMonHoc', async (req, res) => {
//   console.log(req.body);
//   try {
//     const updatedMonhoc = await MonHoc.updateOne(
//       { maMonHoc: req.params.maMonHoc },
//       { $set: { tenMonHoc: req.body.tenMonHoc } }
//     );
//     res.json(updatedMonhoc);
//   } catch (error) {
//     res.json({ message: error });
//   }
// })

module.exports = router;
