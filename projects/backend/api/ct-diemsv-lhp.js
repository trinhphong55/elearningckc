const ctDiemsvLhpModel = require("../models/ct-diemsv-lhp.model");

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
