const trangthaifb = require("../models/trangthaifb.model");
const { check, validationResult } = require("express-validator");

// get tất cả trong db TinhTrangFB
exports.getAll= async (req,res)=>{
    try {
        const data = await trangthaifb.find();
        res.json(data);
      } catch (error) {
        res.json({message: error});
      }
  };
