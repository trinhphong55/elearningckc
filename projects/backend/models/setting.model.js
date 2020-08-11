const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingSchema  = new Schema({
  matKhauSinhVien:{
    type:String,
    required:true,
  },
  matKhauGiaoVien:{
    type:String,
    required:true,
  }
})
module.exports = mongoose.model('setting', settingSchema,'setting');
