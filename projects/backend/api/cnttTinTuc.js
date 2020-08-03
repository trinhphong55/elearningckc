const router = require("express").Router();
const TinTuc = require("../models/cntttintuc.model");
const multer = require("multer");
const PATH = "./uploads/cntt";

let Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, PATH);
  },
  filename: (req, file, callback) => {
    let math = ["image/png", "image/jpeg"];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }
    let filename = `${file.originalname}`;
    callback(null, filename);
  },
});
var upload = multer({
  storage: Storage,
});

router.post("/uploads", upload.single("image"), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false,
    });
  }
  console.log("filename:  " + req.file.filename);
  console.log("File is available!");
  res.send({
    success: true,
  });
});

router.post("/taotintuc", (req, res) => {
  console.log("req.body.anhBia  " + req.body.anhBia);
  var imgName = req.body.anhBia.slice(12);
  var tintuc = new TinTuc({
    loaiBaiViet: req.body.loaiBaiViet,
    maDanhMuc: req.body.maDanhMuc,
    maBaiViet: req.body.maBaiViet,
    tieuDe: req.body.tieuDe,
    moTaNgan: req.body.moTaNgan,
    noiDung: req.body.noiDung,
    anhBia: "uploads/cntt/" + imgName,
    viTriHienThi: req.body.viTriHienThi,
  });
  console.log(tintuc);
  tintuc.save((err, data) => {
    if (err) {
      return next(err);
    }
    res.json(data);
  });
});
//#endregion

router.post("/chinhSuaTinTuc", async (req, res) => {
  console.log(" Chinh sua bai viet");
  console.log("req.body.anhBia  " + req.body.anhBia);
  var imgName = req.body.anhBia.slice(12);
  console.log(req.body.maBaiViet);
  await TinTuc.findOneAndUpdate(
    { _id: req.body._id },
    {
      maBaiViet: req.body.maBaiViet,
      loaiBaiViet: req.body.loaiBaiViet,
      maDanhMuc: req.body.maDanhMuc,
      tieuDe: req.body.tieuDe,
      moTaNgan: req.body.moTaNgan,
      noiDung: req.body.noiDung,
      anhBia: "uploads/cntt/" + imgName,
      viTriHienThi: req.body.viTriHienThi,
      trangThai: req.body.trangThai,
    }
  );
  res.json({
    message: "Chỉnh sửa bài viết thành công",
  });
});
// Get All Tintuc
router.get("/danhsachtintuc", (req, res) => {
  TinTuc.find((error, data) => {
    if (error) {
      return res.json({
        message: "Lấy danh sách bài viết thành công.",
        data: [],
        error: error,
      });
    }
    res.json({ message: "Lấy danh sách bài viết thành công.", data: data });
  });
});
// Get Tintuc by id
router.get("/tintuc/:id", (req, res) => {
  TinTuc.find(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    }
    res.json(data);
  });
});
// add Tintuc add
router.post("/xoatintuc", async (req, res) => {
  console.log(" Xoa bai viet");
  console.log(req.body.maBaiViet);
  await TinTuc.findOneAndUpdate(
    { maBaiViet: req.body.maBaiViet },
    {
      trangThai: 0,
    }
  );
  res.json({
    message: " Xóa bài viết thành công",
  });
});

//#region API
router.get("/danhmuc=:maDanhMuc", async (req, res) => {
  try {
    // res.json(req.params);
    const data = await TinTuc.find({
      maDanhMuc: req.params.maDanhMuc,
    });
    res.json({
      message: "Lấy bài viết theo danh mục thành công",
      code: 200,
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Lấy bài viết theo danh mục thất bại",
      code: 400,
      data: [],
      error: error,
    });
  }
});

router.get("/loaibaiviet=:loaiBaiViet", async (req, res) => {
  try {
    // res.json(req.params);
    const data = await TinTuc.find({
      loaiBaiViet: req.params.loaiBaiViet,
    });
    res.json({
      message: "Lấy bài viết theo loại bài viết thành công",
      code: 200,
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Lấy bài viết theo loại bài viết thất bại",
      code: 400,
      data: [],
      error: error,
    });
  }
});

router.get("/:maDanhMuc/:loaiBaiViet", async (req, res) => {
  try {
    // res.json(req.params);
    const data = await TinTuc.find({
      loaiBaiViet: req.params.loaiBaiViet,
      maDanhMuc: req.params.maDanhMuc,
    });
    res.json({
      message: "Lấy bài viết theo danh mục và loại bài viết thành công",
      code: 200,
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Lấy bài viết theo danh mục và loại bài viết thất bại",
      code: 400,
      data: [],
      error: error,
    });
  }
});
//#endregion

module.exports = router;
