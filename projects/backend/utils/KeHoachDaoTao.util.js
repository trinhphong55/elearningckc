const KHDT = require('../models/KeHoachDaoTao.model');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}

async function isExistedInLHP(maKHDT) {
  // isExisted = true;
  // await KHDT.findOne({ maMonHoc, trangThai: { $ne: 0 } })
  //   .then(khdt => {
  //     if (khdt === null) {
  //       isExisted = false;
  //     }
  //   })
  //   .catch(() => {
  //     isExisted = true;
  //   })
  // return isExisted;
  // console.log('haha');
}

module.exports = {
  isExistedInLHP,
  asyncForEach,
}
