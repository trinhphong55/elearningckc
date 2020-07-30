const SinhVienModel = require('../models/sinh-vien.model');

exports.layTatCaSinhVien = async (req,res) => {
  try {
    const sinhViens = await SinhVienModel.find({ trangThai: "1"});
    res.json(sinhViens);
  } catch (error) {
    res.json(error);
  }

}
