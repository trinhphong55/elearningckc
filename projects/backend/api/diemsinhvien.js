const Diemsinhvien = require("../models/diemsinhvien.model");
const setData = (req) => {
    return {
        maSinhVien: req.body.maSinhVien,
        maDaoTao: req.body.maDaoTao,
        diem: req.body.diem,
        maLopHocPhan: req.body.maLopHocPhan,
        ghiChu: req.body.ghiChu,
        nguoiTao: req.body.nguoiTao,
        nguoiChinhSua: req.body.ngayChinhSua,
        ngayChinhSua: req.body.ngayChinhSua,
        trangThai: req.body.trangThai
    };
  };

exports.getDiemsinhvien = async (req, res) => {
    try {
      const diemsinhvien = await Diemsinhvien.find({maSinhVien: req.params.maSinhVien });
      res.json(diemsinhvien);
    } catch (error) {
      res.json(error);
    }
};
