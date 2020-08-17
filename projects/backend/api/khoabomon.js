const KhoaBoMon = require("../models/khoabomon.model");
const { check, validationResult } = require("express-validator");

exports.getKhoaBonMon = async (req, res) => {
  try {
    const khoabomon = await KhoaBoMon.find({ trangThai: "1" });

    res.json(khoabomon);
  } catch (error) {
    res.json(error);
  }
};
exports.getOneKhoaBoMon = async (req, res) => {
  try {
    const khoaBoMon = await KhoaBoMon.find({ _id: req.params.id });
    res.json(khoaBoMon);
  } catch (error) {
    res.json(error);
  }
};
exports.postKhoaBoMon = async (req, res) => {
  let idIsExist = 0;
  let nameIsExist = 0;

  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(422).json(err.errors);
    }
    const khoabomon = await KhoaBoMon.find();

    khoabomon.forEach((element) => {
      if (req.body.maKhoa === element.maKhoa) {
        idIsExist++;
      }
      if (req.body.tenKhoa === element.tenKhoa) {
        nameIsExist++;
      }
    });

    if (idIsExist > 0) {
      res.json({
        status: 200,
        ok: false,
        msg: "Mã khoa này đã tồn tại",
      });
    } else if (nameIsExist > 0) {
      res.json({
        status: 200,
        ok: false,
        msg: "Tên này đã tồn tại",
      });
    } else {
      let nextNumber = 0;
      await KhoaBoMon
        .findOne({}, {})
        .sort({ maKhoa: -1 })
        .exec()
        .then((bt) => {
          if (bt !== null) {
            nextNumber = bt.maKhoa;
           console.log('toi');
          }
        });


      req.body.maKhoa = nextNumber + 1;
      req.body.maLoai = 1;

      const khoaBoMon = new KhoaBoMon({
        maKhoa: req.body.maKhoa,
        tenKhoa: req.body.tenKhoa,
        tenVietTat: req.body.tenVietTat,
        nguoiTao: req.body.nguoiTao,
        nguoiChinhSua: req.body.nguoiChinhSua,
        maLoai: req.body.maLoai,
      });

      const saveKhoa = await khoaBoMon.save();
      res.json({
        status: 200,
        ok: true,
        msg: "Thêm thành công Khoa-Bộ môn vào danh sách",
        data: saveKhoa,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

exports.deleteKhoaBoMon = async (req, res) => {
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
    const updateKhoa = await KhoaBoMon.updateOne(
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
        status: false,
        msg: "Xóa thất bại",
      };
    } else {
      result = {
        status: true,
        msg: "Xóa thành công ",
      };
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

//validation data from request

exports.checkValidate = () => {
  return [

    check("tenKhoa", "TEN KHOA is must be at most 50 chars long ").isLength({
      max: 50,
    }),
    check("tenKhoa", "TEN KHOA is required").notEmpty(),

    check("tenVietTat", "TEN VIET TAT must be at most 15 char long").isLength({
      max: 15,
    }),
    check("tenVietTat", "TEN VIET TAT is required").notEmpty(),


    check("nguoiChinhSua", "NGUOI CHINH SUASUA is required").notEmpty(),

  ];
};

exports.updateKhoaBoMon = async (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(422).json(err.errors);
    }
    console.log(req.body);

    const updateKhoa = await KhoaBoMon.update(
      { _id: req.params.id },
      {
        $set: {

          tenKhoa: req.body.tenKhoa,
          tenVietTat: req.body.tenVietTat,
          nguoiChinhSua: req.body.nguoiChinhSua,

        },
      }
    );

    let result = {
      status: 200,
      ok: false,
      msg: "",
    };

    if (updateKhoa.nModified === 0) {
      result.msg = "Chưa được cập nhật";
    } else {
      result.ok = true;
      result.msg = "Cập nhật thành công Khoa-Bộ môn";
    }
    res.status(200).json(result);
  } catch (error) {
    res.json(error);
  }
};
