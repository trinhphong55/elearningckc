const MonHoc = require('../models/MonHoc.model');
const KHDT = require('../models/KeHoachDaoTao.model');

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
  tenMonHoc = tenMonHoc.trim().toLowerCase();
  const item = await MonHoc.findOne({ tenMonHoc: { $regex: new RegExp("^" + tenMonHoc , "i") } }).exec();
  if (item === null) {
    return true;
  } else return false;
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}

async function isExistedInKHDT(maMonHoc) {
  isExisted = true;
  await KHDT.findOne({ maMonHoc, trangThai: { $ne: 0 } })
    .then(khdt => {
      if (khdt === null) {
        isExisted = false;
      }
    })
    .catch(() => {
      isExisted = true;
    })
  return isExisted;
}

module.exports = {
  getNextNumber,
  isNameExist,
  asyncForEach,
  isExistedInKHDT,
}
