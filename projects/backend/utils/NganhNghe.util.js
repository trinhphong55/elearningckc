var NganhNghe = require("../models/NganhNghe.model");

async function getNextNumber() {
  const nganhnghe = await NganhNghe.findOne({}, {}, { sort: { 'created_at' : -1 } }).exec();
  if (nganhnghe === null) {
    return "001";
  } else {
    let nextNumber = parseInt(nganhnghe.maNganhNghe) + 1;
    // console.log('Number la ' + nextNumber);
    let maNganhNghe = nextNumber.toString();
    while (maNganhNghe.length < 4) {
        maNganhNghe = "0" + maNganhNghe;
    }
    return maNganhNghe;
  }
}
async function isNameExist(maNganhNghe) {
  maNganhNghe = maNganhNghe.trim().toLowerCase();
  const item = await NganhNghe.findOne({ maNganhNghe: { $regex: new RegExp("^" + maNganhNghe , "i") } }).exec();
  if (item === null) {
    return true;
  } else return false;
}

module.exports = {
  getNextNumber,
  isNameExist
}


module.exports = getNextNumber;
