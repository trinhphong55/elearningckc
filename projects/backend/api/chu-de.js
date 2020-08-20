const chuDeModel = require("../models/chu-de.model");
const baiGiangModel = require("../models/bai-giang.model");

setChuDe = (req) => {
  return {
    thuTu:req.thuTu,
    maChuDe: req.maChuDe,
    maLopHocPhan:req.maLopHocPhan,
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
    // console.log(req.body);
    const chuDeMoi = await chuDeModel.create(setChuDe(req.body));
    res.json({data:chuDeMoi, message:'Thêm thành công'});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Máy chủ không sữ lý được", error: error, status: 500 });
  }
};

exports.layMot = async(req, res) => {
  try {
    const chuDes = await chuDeModel.findOne({ maChuDe:req.params.maChuDe, trangThai:1 });
    return res.json({data: chuDes, message: "Lấy thành công", status: 200 });
  } catch (error) {
    res.json(error);
  }
}
exports.layTheo_MaLHP = async (req, res) => {
  try {
    const chuDes = await chuDeModel.find({ maLopHocPhan:req.params.maLopHocPhan, trangThai:1 });
    return res.json({count:chuDes.length,data: chuDes, message: "Lấy thành công", status: 200 });
  } catch (error) {
    res.json(error);
  }
}
exports.xoaTheo_maChuDe = async (req, res) => {
  try {
    const findBaiGiang = await baiGiangModel.findOne({maChuDe: req.params.maChuDe , trangThai:1});
    if(findBaiGiang){
      return res.json({message: 'Có chứa bài giàng không thể xóa', status:200});
    }
    const chuDe = await chuDeModel.updateOne(
      { maChuDe: req.params.maChuDe, trangThai:1 },
      { $set: { trangThai: 0 } }
    );

    if(chuDe.nModified == 0){
      return res.json({message: 'Xóa thất bại', status:200})
    }
    res.json({message: 'Xóa thành công ', status:200})
  } catch (error) {

  }
}
