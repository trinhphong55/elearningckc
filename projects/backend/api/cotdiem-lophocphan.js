const cotdiemLophocphanModel = require("../models/cotdiem-lophocphan.model");

exports.layDiemLHP = async (req, res) => {
  try {
    const cotdiem = await  cotdiemLophocphanModel.find();
    res.json(cotdiem);
  } catch (error) {
    res.json(error);
  }
};
