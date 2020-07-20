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


module.exports = getNextNumber;
