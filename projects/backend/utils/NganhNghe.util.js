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


module.exports = getNextNumber;
