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

function uploadPhotos(req, res, next) {
  console.log(req.body);
  // upload.single("photos")(req, res, function (error) {
  //   try {
  //     const photo = req.file;
  //     // check if photos are available
  //     if (!photo) {
  //       res.status(400).json({
  //         status: false,
  //         message: "No photo is selected.",
  //       });
  //     } else {
  //       req.body.anhBia = photo.destination + photo.filename;
  //       next();
  //     }
  //   } catch (error) {
  //     res.status(500).send(error);
  //   }
  // });
}
//#endregion
// sua

router.post("/ttthsuathongtinweb", uploadPhotos, async (req, res) => {
  try {
    // console.log(req.body);
    await ttthThongTinWeb.findOneAndUpdate({
      _id: req.body._id
    }, {
      logo:req.body.logo,
      diachi: req.body.diachi,
      giolamviec: req.body.giolamviec,
      hotline: req.body.hotline,
      email: req.body.email,
      copyright: req.body.copyright,
      mxh: req.body.mxh,
      nguoisua: req.body.nguoisua,
      updated_at: req.body.updated_at,
    });
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
