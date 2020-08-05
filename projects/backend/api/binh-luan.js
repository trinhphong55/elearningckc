const binhLuanModel = require("../models/binh-luan.model");

setBinhLuan = (req) => {
  return {
    maBinhLuan:req.maBinhLuan,
    loaiBaiViet: req.loaiBaiViet,
    maBaiViet: req.maBaiViet,
    noiDung: req.noiDung,
    nguoiTao: req.nguoiTao,
  };
};
exports.layBinhLuan_theoBaiViet = async (req, res) => {
  try {
    console.log(req.params);
    const chuDes = await binhLuanModel.find({loaiBaiViet: req.params.loaiBaiViet, maBaiViet: req.params.maBaiViet});
    return res.json({ data: chuDes, message: "Lấy thành công" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Máy chủ không sữ lý được", error: error, status: 500 });
  }
};
exports.themBinhLuan = async (req, res) => {
  try {
    const chuDes = await binhLuanModel.find();
    req.body.maBinhLuan = chuDes.length + 1;
    console.log(req.body);
    const chuDeMoi = await binhLuanModel.create(setBinhLuan(req.body));
    return res.json({ data: chuDeMoi, message: "Thêm thành công" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Máy chủ không sữ lý được", error: error, status: 500 });
  }
};
