const router = require('express').Router();
const MonHoc = require('../models/MonHoc.model');

const { getNextNumber, isNameExist } = require('../utils/MonHoc.util');

//GET MONHOC
router.get('/', async (req, res) => {
  try {
    const dsMonHoc = await MonHoc.find();
    res.json(dsMonHoc);
  } catch (err) {
    res.json({message: err});
  }
})

//IMPORT EXCEL
router.post('/importexcel', async (req, res) => {
  var items = req.body;
  var filterItems = [];

  //Get next maMonHoc
  var maMonHoc = await getNextNumber();
  var numMaMonHoc = parseInt(maMonHoc);

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index);
    }
  }
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
      res.json({ success: "added MonHoc from Excel" });
    }).catch((err) => {
      res.json( {message: err});
    })
  } else {
    res.json( {error: "du lieu trong hoac da ton tai"})
  }
});


//POST MONHOC
router.post('/', async (req, res) => {

  nameExist = await isNameExist(req.body.tenMonHoc);
  if (!nameExist) {
    return res.json( {error: "ten mon hoc da ton tai"} );
  }

  maMonHoc = await getNextNumber();
  const { tenMonHoc, tenVietTat, loaiMonHoc, tenTiengAnh, tenVietTatTiengAnh } = req.body;
  const monHoc = new MonHoc({ maMonHoc, tenMonHoc, tenVietTat, loaiMonHoc, tenTiengAnh, tenVietTatTiengAnh });
  monHoc.save().then(() => {
    res.json({ success: "added MonHoc" });
  }).catch(err => {
    res.json( {message: err});
  });
});


//SPECIFIC MONHOC
router.get('/:maMonHoc', async (req, res) => {
  try {
    const item = await MonHoc.findOne({ maMonHoc: req.params.maMonHoc });
    if (item === null) {
      res.json({status: "null"});
    } else {
      res.json(item);
    }
  } catch (err) {
    res.json({message: err});
  }
})

router.get('loaimonhoc/:maMonHoc', async (req, res) => {
  try {
    const item = await MonHoc.findOne({ maMonHoc: req.params.maMonHoc });
    if (item === null) {
      res.json({status: "null"});
    } else {
      res.json(item.loaiMonHoc);
    }
  } catch (err) {
    res.json({message: err});
  }
})

//DELETE MONHOC
router.delete('/:maMonHoc', async (req, res) => {
  try {
    console.log(req.params);
    const removedMonhoc = await MonHoc.deleteOne({ maMonHoc: req.params.maMonHoc }).exec();
    res.json(removedMonhoc);
  } catch (error) {
    res.json({ message: error});
  }
})

//UPATE MONHOC
router.put('/:maMonHoc', async (req, res) => {
  console.log('du lieu chua update', req.body);
  const { maMonHoc } = req.params;
  const { tenMonHoc, tenVietTat, loaiMonHoc, tenTiengAnh, tenVietTatTiengAnh } = req.body;
  await MonHoc.updateOne(
      { maMonHoc: maMonHoc },
      { $set: { tenMonHoc, tenVietTat, loaiMonHoc, tenTiengAnh, tenVietTatTiengAnh } }
  ).then(() => {
    res.json({ success: "updated MonHoc" });
  }).catch(err => {
    res.json({ message: err });
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
