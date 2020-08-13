const router = require('express').Router()
const ttthThongTinWeb = require('../models/ttththongtinweb.model');
const multer = require('multer')
const convertString = require("../common/convertString");
const path = require("path");
// get
router.get('/ttthdanhsachthongtinweb', async (req, res) => {
  ttthThongTinWeb.find((error, data) => {
    if (error) {
      return next(error)
    }
    res.json(data)
  })
})

//#region MULTER UPLOAD IMAGE
// upload file path
const FILE_PATH = "uploads/cntt/";

// define multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_PATH);
  },
  filename: (req, file, cb) => {
    const filename =
      file.fieldname + "_" + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    files: 10, // allow up to 10 files per request
    fieldSize: 5 * 1024 * 1024, // 5MB (max file size)
  },
  fileFilter: (req, file, cb) => {
    // allow images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image are allowed."), false);
    }
    cb(null, true);
  },
});

async function uploadPhotos(req, res, next) {
  // console.log("run uploadPhotos");
  upload.single("image")(req, res, function (error) {
    try {
      const photo = req.file;
      // check if photos are available
      if (!photo) {
        res.status(400).json({
          status: false,
          message: "No photo is selected.",
        });
      } else {
        req.body.anhBia = photo.destination + photo.filename;
        next();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
}
//#endregion
// sua

router.post("/ttthsuathongtinweb", uploadPhotos, async (req, res) => {
  try {
    console.log(req.body);
    // await TinTuc.findOneAndUpdate(
    //   { _id: req.body._id },
    //   {
    //     maBaiViet: req.body.maBaiViet,
    //     anhBia: req.body.anhBia,
    //     maDanhMuc: req.body.maDanhMuc,
    //     loaiBaiViet: req.body.loaiBaiViet,
    //     tieuDe: req.body.tieuDe,
    //     tieuDeASCII: req.body.tieuDeASCII,
    //     moTaNgan: req.body.moTaNgan,
    //     noiDung: req.body.noiDung,
    //     noiDungASCII: req.body.noiDungASCII,
    //     nguoiViet: req.body.nguoiViet,
    //     viTriHienThi: req.body.viTriHienThi,
    //     trangThai: req.body.trangThai,
    //   }
    // );
    res.json({
      message: "Chỉnh sửa bài viết thành công",
      code: 200,
    });
  } catch (error) {
    res.json({
      message: "Chỉnh sửa bài viết thất bại",
      code: 400,
      error: error,
    });
  }
});


module.exports = router
