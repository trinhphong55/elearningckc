const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const baidangfbSchema = new Schema({
    ID: {
      type: String,
      reqired: true,
      
    },
    postID: {
      type: String,
      
  
    },
    link: {
      type: String,
      
  
    },
    message: {
      type: String,
      
  
    }, 
    url: {
        type: String
        
    
    }, 
    maLoai:{
        type:Number,
        reqired: true
    },
    loai: {
        type: String,
        required: true
    
    }, 
    thuoc: {
        type: String,
        required: true
    
    }, 
    trangThai: {
      type: Number,
      default: 1,
    },
    
  });
  
  module.exports = mongoose.model("QLBaiDangFB", baidangfbSchema,"QLBaiDangFB");