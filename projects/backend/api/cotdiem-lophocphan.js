const cotdiemLophocphanModel = require("../models/cotdiem-lophocphan.model");

exports.layDiemLHP = async (req, res) => {
  try {
    const cotdiem = await cotdiemLophocphanModel.find();
    res.json(cotdiem);
  } catch (error) {
    res.json(error);
  }
};

exports.layDiemLHPtheoMaLHP = async (req, res) => {
  try {
    const cotdiem = await cotdiemLophocphanModel.find({
      maLopHocPhan: req.params.maLopHocPhan,
    });
    res.json({ data: cotdiem, count: cotdiem.length , maLopHocPhan: req.params.maLopHocPhan});
  } catch (error) {
    res.json(error);
  }
};
//lay cot diem theo ma lop hp trinh phong
exports.layCotDiemTheoMaLopHp = async (req, res) => {
  try {
    const cotdiem = await cotdiemLophocphanModel.find({maLopHocPhan: req.params.maLopHocPhan});
    res.json(cotdiem);
  } catch (error) {
    res.json(error);
  }
};