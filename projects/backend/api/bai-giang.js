const baiGiangModel = require("../models/bai-giang.model");
var path = require("path");

setBaiGiang = (req) => {
  return {
    thuTu: req.thuTu,
    tieuDe: req.tieuDe,
    maBaiGiang: req.maBaiGiang,
    maChuDe: req.maChuDe,
    maLopHocPhan: req.maLopHocPhan,
    moTa: req.moTa,
    dinhKem: req.dinhKem,
    nguoiDang: req.nguoiDang,
    nguoiChinhSua: req.nguoiChinhSua ? req.nguoiChinhSua : req.nguoiDang,
  };
};
exports.layTatCa = async (req, res) => {
  try {
    const baiGiangs = await baiGiangModel.find({ trangThai: 1 });
    res.json({
      count: baiGiangs.length,
      data: baiGiangs,
      message: "Lấy thành công",
      status: 200,
    });
  } catch (error) {
    res.json(error);
  }
};
exports.them = async (req, res) => {
  try {
    // const chuDes = await baiGiangModel.find();
    let nextNumber = 1;
    //get NextNumber
    await baiGiangModel
      .findOne({}, {}, { sort: { thuTu: -1 } })
      .exec()
      .then((bt) => {
        if (bt !== null) {

          nextNumber = bt.maBaiGiang + 1;
        }
      });

    req.body.maBaiGiang = nextNumber;
    req.body.thuTu = nextNumber;
    const chuDeMoi = await baiGiangModel.create(setBaiGiang(req.body));
    res.json({ data: chuDeMoi, message: "Thêm thành công", status: 200 });
  } catch (error) {
    res.status(500).json({
      message: "Máy chủ không sữ lý được",
      errors: error,
      status: 500,
    });
  }
};
exports.layTheoMaChuDe = async (req, res) => {
  try {
    const baiGiangs = await baiGiangModel.find({ maChuDe: req.params.maChuDe, trangThai:1 });
    res.json({
      maChuDe: req.params.maChuDe,
      count: baiGiangs.length,
      data: baiGiangs,
      message: "Lấy thành công",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Máy chủ không sử lý được",
      errors: error,
      status: 500,
    });
  }
};
exports.layTheo_MaLHP = async (req, res) => {
  try {
    const chuDes = await baiGiangModel.find({
      maLopHocPhan: req.params.maLopHocPhan,
      trangThai:1
    });
    return res.json({
      count: chuDes.length,
      data: chuDes,
      message: "Lấy thành công",
      status: 200,
    });
  } catch (error) {
    res.json(error);
  }
};

exports.layTheo_maBaiGiang = async (req, res) => {
  try {
    const chuDes = await baiGiangModel.findOne({
      maBaiGiang: req.params.maBaiGiang,
    });
    return res.json({
      id: chuDes.maBaiGiang,
      data: chuDes,
      message: "Lấy thành công",
      status: 200,
    });
  } catch (error) {
    res.json(error);
  }
};

var multer = require("multer");
const PATH = "./uploads/elearning/baigiang";

var store = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PATH);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.originalname);
  },
});

var upload = multer({ storage: store }).single("file");

exports.upload = function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.status(501).json({ error: err });
    }
    //do all database record saving activity
    return res.json(req.file.filename);
  });
};

exports.download = function (req, res, next) {
  try {
    filepath =
      path.join(__dirname, "../uploads/elearning/baigiang") +
      "/" +
      req.body.filename;
    res.sendFile(filepath);
  } catch (error) {
    res.json({ err: "Không tìm thấy file" });
  }
};

exports.xoa =async (req, res) => {
  try {
    const findBaiGiang = await baiGiangModel.findOne({maBaiGiang: req.params.maBaiGiang , trangThai:1});
    if(!findBaiGiang){
      return res.json('Không tìm thấy Mã bài giảng');
    }
    const baiGiang = await baiGiangModel.updateOne(
      { maBaiGiang: req.params.maBaiGiang, trangThai:1 },
      { $set: { trangThai: 0 } }
    );

    res.json({message: 'Xóa thành công ' + findBaiGiang.tieuDe, status:200})
  } catch (error) {

  }

};
