const LopHoc = require("../models/LopHoc.model");
const { check, validationResult } = require("express-validator");

// "maLopHoc": "mã Bậc + mã Ngành Nghề + Khoá Học + mã Loại Hình Đào Tạo + Số thứ tự",
// "tenLop": "kiểu String",
// "tenVietTat": "kiểu String",
// "linkFBLopHoc": "kiểu String",
// "nguoiTao": "mã trong bảng Giáo Viên",
// "nguoiChinhSua": "mã trong bảng Giáo Viên",
// "ngayChinhSua": "kiểu DateTime",
// "trangThai": "kiểu Int"
let result;

const setLopHoc = (req) => {
  return {
    maLopHoc: req.body.maLopHoc,
    tenLop: req.body.tenLop,
    tenVietTat: req.body.tenVietTat,
    linkFBLopHoc: req.body.linkFBLopHoc,
    nguoiTao: req.body.nguoiTao,
    nguoiChinhSua: req.body.nguoiChinhSua,
    ngayChinhSua: Date.now(),
    maNganh: req.body.maNganh,
    maBac: req.body.maBac,
    khoa: req.body.khoa,
  };
};
exports.getAll = async (req, res) => {
  try {
    const LopHocs = await LopHoc.find({ trangThai: 1 });
    res.json(LopHocs);
  } catch (error) {
    res.json(error);
  }
};
exports.getOne = async (req, res) => {
  try {
    const khoaBoMon = await LopHoc.find({ _id: req.params.id });
    res.json(khoaBoMon);
  } catch (error) {
    res.json(error);
  }
};
exports.update = async (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(422).json(err.errors);
    }
    const updateKhoa = await LopHoc.updateOne(
      { _id: req.params.id },
      {
        $set: setLopHoc(req),
      }
    );

    result = {
      status: 200,
      ok: false,
      msg: "",
    };
    if (updateKhoa.nModified === 0) {
      result.msg = "Chưa được cập nhật";
    } else {
      result.ok = true;
      result.msg = "Cập nhật thành công Lớp học";
    }

    res.status(200).json(result);
  } catch (error) {
    res.json(error);
  }
};

exports.insert = async (req, res) => {
  try {
    let idIsExist = 0;
    let nameIsExist = 0;

    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(422).json(err.errors);
    }
    const LopHocs = await LopHoc.find({ trangThai: 1 });

    LopHocs.forEach((element) => {
      if (req.body.maLopHoc == element.maLopHoc) {
        idIsExist++;
      }
      if (req.body.tenLop == element.tenLop) {
        nameIsExist++;
      }
    });

    if (idIsExist > 0) {
      res.json({
        status: 200,
        ok: false,
        msg: "Mã này đã tồn tại",
      });
    } else if (nameIsExist > 0) {
      res.json({
        status: 200,
        ok: false,
        msg: "Tên này đã tồn tại",
      });
    } else {
      const lophoc = new LopHoc(setLopHoc(req));
      const data = await lophoc.save();
      result = {
        status: 200,
        ok:true,
        msg: "Thêm thành công Lớp học",
        data: data,
      };
      res.json(result);
    }
  } catch (error) {
    res.json(error);
  }
};

exports.delete = async (req, res) => {
  // const removeKhoa = await KhoaBoMon.remove({ _id: req.params.id });
  // if (removeKhoa.deletedCount === 0) {
  //   res.json({ status: false, msg: "Id nay khong ton tai" });
  // } else {
  //   res.json({
  //     status: true,
  //     msg: "Deleted successful",
  //   });
  // }

  try {
    const updateKhoa = await LopHoc.updateOne(
      { _id: req.params.id },
      {
        $set: {
          trangThai: 0,
        },
      }
    );

    let result;

    if (updateKhoa.nModified === 0) {
      result = {
        status: 200,
        msg: "Xóa thất bại",
      };
    } else {
      result = {
        status: 200,
        msg: "Xóa thành công ",
      };
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};
exports.checkValidate = () => {
  return [
    check("maLopHoc", "maLopHoc IS REQUIRE").notEmpty(),
    check("tenLop", "tenLop IS REQUIRE").notEmpty(),
    check("tenVietTat", "tenVietTat IS REQUIRE").notEmpty(),
    check("linkFBLopHoc", "linkFBLopHoc IS REQUIRE").notEmpty(),
  ];
};
exports.removeAll = async (req, res) => {
  const removeKhoa = await LopHoc.remove({ trangThai: 1 });
  if (removeKhoa.deletedCount === 0) {
    res.json({ status: false, msg: "Id nay khong ton tai" });
  } else {
    res.json({
      status: true,
      msg: "Deleted  All successful",
    });
  }
};
exports.search = async (req, res) => {
  try {
    const search = LopHoc.find({ maNganh: req.params.maBac });
    res.json(search);
  } catch (error) {
    res.json(error);
  }
};
