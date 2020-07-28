const SinhVienModel = require('../models/sinh-vien.model');

exports.layTatCaSinhVien = (req,res) => {
  try {
    const sinhViens = SinhVienModel.find();
    res.json(sinhViens);
  } catch (error) {
    res.json(error);
  }

}
