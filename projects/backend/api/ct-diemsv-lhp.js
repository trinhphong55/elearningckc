const ctDiemsvLhpModel = require("../models/ct-diemsv-lhp.model");
///lay chi tiet diem lop hp theo ma lop hp
exports.layCTDiemLopHPtheoMaLopHP = async (req, res) => {
  try {
    var data = await ctDiemsvLhpModel.find({maHocPhan:req.params.maHocPhan});
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
exports.layCTDiemLopHPtheoMaSV = async (req, res) => {
  try {
    const diem = await ctDiemsvLhpModel.find({ maSinhVien: req.params.masv });
    res.json({
      id:req.params.masv,
      data: diem,
      count: diem.length,
      message: "Lấy thành công điểm lớp học phần",
    });
  } catch (error) {
    res.json(error);
  }
};
