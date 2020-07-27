const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const groupfbSchema = new Schema({
    id_Group: {
        type:Number,
        require: true,
        unique: true
    },

    linkGroup: {
        type:String,
        require: true,
        unique: true
    },

    tenGroup: {
        type: String,
        require: true,

    },

    tenBac: {
        type: String,
      },

    tenNganhNghe: {
        type: String,
    },

    tenKhoa: {
        type: String,
        required: true,
        unique:true
    
    },

    tenLop: {
        type: String,
        required: true,
    
    },

    soLuongBaiViet: {
        type:Number,
        require: true
    },

    ngayTao :{
        type:Date,default:Date.now
    },

    trangThai: {
        type:Number
    }

});
module.exports = mongoose.model("GroupFB", groupfbSchema,"GroupFB");
