const binhLuanModel = require("../models/binh-luan.model");
const { ObjectID } = require("mongodb");

setBinhLuan = (req) => {
  return {
    maBinhLuan:new ObjectID(),
    loaiBaiViet: req.loaiBaiViet,
    maBaiViet: req.maBaiViet,
    noiDung: req.noiDung,
    nguoiTao: req.nguoiTao,
  };
};
exports.layBinhLuan_theoBaiViet = async (req, res) => {
  try {
    // console.log(req.params);
    const chuDes = await binhLuanModel.find({
      loaiBaiViet: req.params.loaiBaiViet,
      maBaiViet: req.params.maBaiViet,
    });

    return res.json({
      maBaiViet:req.params.maBaiViet,
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
