const KhoaBoMon = require("../models/khoabomon.model");

exports.getKhoaBonMon = async (req, res) => {
  try {
    const khoabomon = await KhoaBoMon.find({'trangThai':'1'});

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
        status: false,
        msg: "Id nay da ton tai",
      });
    } else if (nameIsExist > 0) {
      res.json({
        status: false,
        msg: "Tên này đã tồn tại",
      });
    } else {
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
        status: true,
        msg: "Created Khoa Successful",
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
    const updateKhoa = await KhoaBoMon.update(
      { _id: req.params.id },
      {
        $set: {
          trangThai: 0,
        },
      }
    );

    let result;

    if (updateKhoa.n === 0) {
      result = {
        status: false,
        msg: "err",
      };
    } else {
      result = {
        status: true,
        msg: " Deleted successful",
      };
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

exports.updateKhoaBoMon = async (req, res) => {
  try {
    const updateKhoa = await KhoaBoMon.update(
      { _id: req.params.id },
      {
        $set: {
          maKhoa: req.body.maKhoa,
          tenKhoa: req.body.tenKhoa,
          tenVietTat: req.body.tenVietTat,
          nguoiTao: req.body.nguoiTao,
          nguoiChinhSua: req.body.nguoiChinhSua,
        },
      }
    );

    let result;

    if (updateKhoa.n === 0) {
      result = {
        status: false,
        msg: "err",
      };
    } else {
      result = {
        status: true,
        msg: " Update successful",
      };
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};
