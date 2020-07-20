const router = require('express').Router();
const MonHoc = require('../models/MonHoc.model');

const getNextNumber = require('../utils/MonHoc.util');

//GET MONHOC
router.get('/monhoc', async (req, res) => {
  try {
    const dsMonHoc = await MonHoc.find();
    res.json(dsMonHoc);
  } catch (err) {
    res.json({message: err});
  }
})

//IMPORT EXCEL
router.post('/monhoc/importexcel', async (req, res) => {
  console.log('BAT DAU IMPORT EXCEL');
  var items = req.body;

  //Get next maMonHoc
  var maMonHoc = await getNextNumber();
  var numMaMonHoc = parseInt(maMonHoc);
  var index = 0;

  // Check name exist
  items.forEach(async item => {
    let exist = await MonHoc.findOne({ tenMonHoc: item.tenMonHoc }).exec();
    if (exist === null) {
      console.log("ten mon hoc chua co --> duoc chap nhan");
      stringMaMonHoc = "000" + numMaMonHoc;
      item.maMonHoc = stringMaMonHoc.slice(stringMaMonHoc.length - 4, stringMaMonHoc.length);
      // MonHoc.create(item).then(() => {
      //   // res.json({success: "them 1 thang"});
      // }).catch((err) => {
      //   // res.json({error: err});
      // })
      numMaMonHoc++;
      console.log("xem 1 item",item);
    } else {
      // res.json({ error: "thang nay ton tai"});
      items.splice(index, 1);
    }
    index++;
  })

  console.log('chay cuoi cung', items);


  // MonHoc.insertMany(items).then(data => {
  //   res.json(data);
  // }).catch((err) => {
  //   res.json({message: err});
  // })
});


//POST MONHOC
router.post('/monhoc', async (req, res) => {
  // const item = await MonHoc.findOne({ tenMonHoc: req.body.tenMonHoc }).exec();
  // if (item !== null) {
  //   return res.json({ error: "tenMonHoc existed" });
  // }
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
router.get('/monhoc/:maMonHoc', async (req, res) => {
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

//DELETE MONHOC
router.delete('/monhoc/:maMonHoc', async (req, res) => {
  try {
    console.log(req.params);
    const removedMonhoc = await MonHoc.deleteOne({ maMonHoc: req.params.maMonHoc }).exec();
    res.json(removedMonhoc);
  } catch (error) {
    res.json({ message: error});
  }
})

//UPATE MONHOC
router.put('/monhoc/:maMonHoc', async (req, res) => {
  console.log('du lieu chua update', req.body);
  const { maMonHoc } = req.params;
  const { tenMonHoc, tenVietTat, loaiMonHoc, tenTiengAnh, tenVietTatTiengAnh } = req.body;
  await MonHoc.updateOne(
      { maMonHoc: maMonHoc },
      { $set: { tenMonHoc, tenVietTat, loaiMonHoc, tenTiengAnh, tenVietTatTiengAnh } }
  ).then(() => {
    res.json({ status: "success" });
  }).catch(err => {
    res.json({ message: err });
  });
})
// router.patch('/monhoc/:maMonHoc', async (req, res) => {
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
