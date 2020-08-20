const binhLuanModel = require("../models/binh-luan.model");
const baiGiang = require('../models/bai-giang.model');

const { ObjectID } = require("mongodb");

setBinhLuan = (req) => {
  return {
    maBinhLuan: new ObjectID(),
    loaiBaiViet: req.loaiBaiViet,
    maBaiViet: req.maBaiViet,
    noiDung: req.noiDung,
    nguoiTao: req.nguoiTao,
  };
};
exports.layTatCaBinhLuan = async (req, res) => {
  try {

    let loaiBaiViet = [];
    const binhLuan = await binhLuanModel.find({trangThai: 1});
    for(let i = 1; i <= 2; i ++){
      let item = { loai: i, data: []};
      binhLuan.forEach(bl => {
        if(bl.loaiBaiViet  == i){
          item.data.push(bl);
        }
      });
      loaiBaiViet.push(item);
    }

    res.json(loaiBaiViet);
  } catch (error) {
    res.json(error);
  }
};
exports.layBinhLuan_theoBaiViet = async (req, res) => {
  try {
    // console.log(req.params);
    const chuDes = await binhLuanModel.find({
      loaiBaiViet: req.params.loaiBaiViet,
      maBaiViet: req.params.maBaiViet,
    });

    return res.json({
      maBaiViet: req.params.maBaiViet,
      count: chuDes.length,
      data: chuDes,
      message: "Lấy thành công",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Máy chủ không sữ lý được", error: error, status: 500 });
  }
};
exports.themBinhLuan = async (req, res) => {
  try {
    const chuDeMoi = await binhLuanModel.create(setBinhLuan(req.body));
    return res.json({ data: chuDeMoi, message: "Thêm thành công" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Máy chủ không xử lý được", error: error, status: 500 });
  }
};
