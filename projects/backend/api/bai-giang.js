const baiGiangModel = require("../models/bai-giang.model");

setBaiGiang = (req) => {
  return {
    thuTu: req.thuTu,
    tieuDe: req.tieuDe,
    maBaiGiang: req.maBaiGiang,
    maChuDe: req.maChuDe,
    maLopHocHocPhan: req.maLopHocHocPhan,
    moTa: req.moTa,
    dinhKem: req.dinhKem,
    nguoiDang: req.nguoiDang,
    nguoiChinhSua: req.nguoiChinhSua?req.nguoiChinhSua:req.nguoiDang,
  };
};
exports.layTatCa = async (req, res) => {
  try {
    const baiGiangs = await baiGiangModel.find({ trangThai: 1 });
    res.json({ count: baiGiangs.length,data: baiGiangs, message: "Lấy thành công", status: 200 });
  } catch (error) {
    res.json(error);
  }
};
exports.them = async (req, res) => {
  try {
    const chuDes = await baiGiangModel.find();
    req.body.thuTu = chuDes.length + 1;
    req.body.maBaiGiang = chuDes.length + 1;
    const chuDeMoi = await baiGiangModel.create(setBaiGiang(req.body));
    res.json({ data: chuDeMoi, message: "Thêm thành công", status:200 });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Máy chủ không sữ lý được", errors: error, status: 500 });
  }
};
exports.layTheoMaChuDe = async (req, res) => {
  try {
    const baiGiangs = await baiGiangModel.find({maChuDe: req.params.maChuDe});
    res.json({ maChuDe: req.params.maChuDe,count: baiGiangs.length,data: baiGiangs, message: "Lấy thành công", status: 200 });
  } catch (error) {
    res
    .status(500)
    .json({ message: "Máy chủ không sữ lý được", errors: error, status: 500 });
  }
}
