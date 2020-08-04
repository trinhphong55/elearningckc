const chuDeModel = require("../models/chu-de.model");

setChuDe = (req) => {
  return {
    thuTu:req.thuTu,
    maChuDe: req.maChuDe,
    tenChuDe: req.tenChuDe,
    ngayChinhSua: req.ngayChinhSua?req.ngayChinhSua:(new Date()).toISOString(),
    nguoiChinhSua: req.nguoiChinhSua,
  };
};
exports.layTatCa = async (req, res) => {
  try {
    const chuDes = await chuDeModel.find({ trangThai: 1 });
    return res.json({ count:chuDes.length, data: chuDes, message: "Lấy thành công", status: 200 });
  } catch (error) {
    res.json(error);
  }
};
exports.them = async (req, res) => {
  try {
    const chuDes = await chuDeModel.find();
    req.body.thuTu = chuDes.length + 1;
    req.body.maChuDe  = chuDes.length + 1;
    console.log(req.body);
    const chuDeMoi = await chuDeModel.create(setChuDe(req.body));
    res.json({data:chuDeMoi, message:'Thêm thành công'});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Máy chủ không sữ lý được", error: error, status: 500 });
  }
};
