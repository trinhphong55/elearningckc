const loaidonviModel = require("../models/loaidonvi.model");

exports.getLoaiDonVi = async (req, res) => {
  try {
    const loaiDonVi = await loaidonviModel.find({ maLoaiDonVi: { $ne: "1" } });
    res.json(loaiDonVi);
  } catch (error) {
    console.log(error);
  }
};
