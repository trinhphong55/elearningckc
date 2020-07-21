const MonHoc = require('../models/MonHoc.model');

async function getNextNumber() {
  const monhoc = await MonHoc.findOne({}, {}, { sort: { 'created_at' : -1 } }).exec();
  if (monhoc === null) {
    return "0001";
  } else {
    let nextNumber = parseInt(monhoc.maMonHoc) + 1;
    // console.log('Number la ' + nextNumber);
    let maMonHoc = nextNumber.toString();
    while (maMonHoc.length < 4) {
      maMonHoc = "0" + maMonHoc;
    }
    return maMonHoc;
  }
}

async function isNameExist(tenMonHoc) {
  // const item = await MonHoc.findOne({ tenMonHoc: req.body.tenMonHoc }).exec();
  // if (item !== null) {
  //   return res.json({ error: "tenMonHoc existed" });
  // }
  tenMonHoc = tenMonHoc.trim().toLowerCase();
  const item = await MonHoc.findOne({ tenMonHoc: { $regex: new RegExp("^" + tenMonHoc , "i") } }).exec();
  if (item === null) {
    return true;
  } else return false;
}

module.exports = {
  getNextNumber,
  isNameExist
}
