const LopHoc = require("../models/LopHoc.model");
const { check, validationResult } = require("express-validator");
const sinhVienModel = require("../models/sinh-vien.model");

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
const view = (req) => {
  return {
    maLopHoc: req.maLopHoc,
    tenLop: req.tenLop,
    tenVietTat: req.tenVietTat,
    linkFBLopHoc: req.linkFBLopHoc,
    nguoiTao: req.nguoiTao,
    nguoiChinhSua: req.nguoiChinhSua,
    ngayChinhSua: req.ngayChinhSua,
    maNganh: req.maNganh,
    maBac: req.maBac,
    khoa: req.khoa,
    siSo: req.siSo,
    tenGroupFB: req.tenGroupFB,
    IDGroupFB: req.IDGroupFB,
    linkGroupFB: req.linkGroupFB,
  };
};

exports.getAll = async (req, res) => {
  try {
    const LopHocs = await LopHoc.find({ trangThai: 1 }).sort({
      maLopHoc: "asc",
    });
    let result = [];
    result = await LopHocs.map(async (lop) => {
      const total = await sinhVienModel.countDocuments({
        maLopHoc: lop.maLopHoc,
      });
      lop.siSo = total;
      return view(lop);
    });

    const kq = await Promise.all(result);
    res.json(kq);
  } catch (error) {
    res.json(error);
  }
};
exports.getOne = async (req, res) => {
  try {
    const khoaBoMon = await LopHoc.findOne({ maLopHoc: req.params.id });
    res.json(khoaBoMon);
  } catch (error) {
    res.json(error);
  }
};
exports.getAllForManghanh = async (req, res) => {
  try {
    let LopHocs = await LopHoc.find({
      maNganh: req.params.maNganh,
    });
    res.json(LopHocs);
  } catch (error) {
    res.json(error);
  }
};
exports.getAllForkhoa = async (req, res) => {
  try {
    let LopHocs = await LopHoc.find({
      maNganh: req.params.khoa,
    });
    res.json(LopHocs);
  } catch (error) {
    res.json(error);
  }
};
exports.deleteTheoTienTo = async (req, res) => {
  try {
    let TienTo = req.params.tienTo;
    TienTo = TienTo.slice(0, 7);

    if (TienTo.length >= 7) {
      const sv = await sinhVienModel.findOne({
        maLopHoc: { $regex: TienTo + ".*" },
      });
      if (sv) {
        return res.status(200).json({
          status: 200,
          msg: "Xóa thất bại, chỉ tiêu chứa lớp đã được thêm sinh viên",
          tienTo: TienTo,
        });
      }
      let LopHocs = await LopHoc.deleteMany({
        maLopHoc: { $regex: TienTo + ".*" },
      });

      if (LopHocs.deletedCount === 0) {
        res.status(200).json({
          status: 200,
          msg: "Xóa thất bại",
          tienTo: TienTo,
          xoa: LopHocs.deletedCount,
        });
      } else {
        res.status(200).json({
          status: 200,
          msg: "Xóa thành công",
          tienTo: TienTo,
          xoa: LopHocs.deletedCount,
        });
      }
    } else {
      res.status(200).json({
        status: 200,
        msg: "Mã chương trình sai",
        tienTo: TienTo,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.update = async (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(422).json(err.errors);
    }
    const updateKhoa = await LopHoc.updateOne(
      { maLopHoc: req.params.id },
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
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(422).json(err.errors);
    }
    const LopHocs = await LopHoc.find({ trangThai: 1 });

    LopHocs.forEach((element) => {
      if (req.body.maLopHoc == element.maLopHoc) {
        return res.json({
          status: 422,
          ok: false,
          msg: "Mã này đã tồn tại",
        });
      }
      if (req.body.tenLop == element.tenLop) {
        return res.json({
          status: 422,
          ok: false,
          msg: "Tên này đã tồn tại",
        });
      }
      if (req.body.tenVietTat == element.tenVietTat) {
        return res.json({
          status: 422,
          ok: false,
          msg: "Tên viết tắt này đã tồn tại",
        });
      }
    });

    const lophoc = new LopHoc(setLopHoc(req));
    const data = await lophoc.save();

    res.json({
      status: 200,
      ok: true,
      msg: "Thêm thành công lớp " + req.body.tenVietTat ,
      data: data,
    });
  } catch (error) {
    res.json(error);
  }
};

exports.delete = async (req, res) => {

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
    check("maLopHoc", "Mã lớp học không được để trống").notEmpty(),
    check("tenLop", "Tên lớp học không được để trốngtrống").notEmpty(),
    check("tenVietTat", "Tên viết tắt không được để trốngtrống").notEmpty(),
    check("linkFBLopHoc", "Link Facebook không được để trống").notEmpty(),
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
    const search = LopHoc.find({ maNganh: req.params.maNganh });
    res.json(search);
  } catch (error) {
    res.json(error);
  }
};
//vd tiento: 3006171
exports.timLopTheoTienTo = async (req, res) => {
  try {
    let TienTo = req.params.tienTo;
    TienTo = TienTo.slice(0, 7);
    if (TienTo.length >= 7) {
      const lop = await LopHoc.find({
        maLopHoc: { $regex: +TienTo + ".*" },
      });
      return res.json({ count: lop.length, tienTo: TienTo, data: lop });
    } else {
      return res.json({ count: 0, tienTo: TienTo, data: null });
    }
  } catch (error) {
    res.json(error);
  }
};
exports.capNhatThongTinFaceBook = async (req, res) => {
  try {
    const updateKhoa = await LopHoc.updateOne(
      { maLopHoc: req.params.maLop },
      {
        $set: {
          tenGroupFB: req.body.tenGroupFB,
          IDGroupFB: req.body.IDGroupFB,
          linkGroupFB: req.body.linkGroupFB,
        },
      }
    );
    const findLopHoc = await LopHoc.findOne({ maLopHoc: req.params.maLop });
    result = {
      status: 200,
      ok: false,
      msg: "",
      data: findLopHoc,
    };
    if (updateKhoa.nModified === 0) {
      result.msg = "Cập nhật thành công, không có gì thay đổi";
    } else {
      result.ok = true;
      result.msg = "Cập nhật thành công vào Lớp học";
    }

    res.status(200).json(result);
  } catch (error) {
    res.json(error);
  }
};

//trinhphong
exports.timLopTheoMaBac = async (req, res) => {
  var bac = parseInt(req.params.maBac);
  try {
    var data = await LopHoc.find({ maBac: bac }).exec();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
};

//Yasuo fam linh 100 con trong 10 phut
exports.getDSLopHocbymaCTDT = async (req, res) => {
  const maCTDT = req.params.maCTDT;
  await LopHoc.find({ maLopHoc: { $regex: maCTDT }, trangThai: { $ne: 0 } })
    .then((ds) => {
      return res.json(ds);
    })
    .catch((err) => {
      return res.json({ message: err });
    });
};
