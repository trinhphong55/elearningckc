const loaidonviModel = require('../models/loaidonvi.model');

exports.getLoaiDonVi = async (req, res) => {
  try {
    const loaiDonVi = await loaidonviModel.find();
    res.json(loaiDonVi);
  } catch (error) {
    console.log(error);
  }
}
