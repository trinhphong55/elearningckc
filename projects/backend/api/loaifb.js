const loaifb = require("../models/loaifb.model");
const { check, validationResult } = require("express-validator");

// get tất cả trong db LoaiFB
exports.getAll= async (req,res)=>{
    try {
        const data = await loaifb.find();
        res.json(data);
      } catch (error) {
        res.json({message: error});
      }
  };
