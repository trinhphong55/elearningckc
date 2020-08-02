const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const ThongTinChung = require("../models/cnttThongTinChung");

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
    cb(null, file.originalname);
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
  upload.array("photos")(req, res, function (error) {
    try {
      const photos = req.files;
      // check if photos are available
      if (!photos) {
        res.status(400).json({
          status: false,
          message: "No photo is selected.",
        });
      } else {
        let data = [];
        photos.map((p) =>
          data.push({
            src: p.destination + p.filename,
          })
        );
        req.body.uploads = data;
        next();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
}
//#endregion

async function saveInformationsToDatabase(req, res) {
  try {
    if (req.body._id === "undefined") {
      const thongTinChungMoi = new ThongTinChung();
      thongTinChungMoi.diaChi = req.body.diaChi;
      thongTinChungMoi.email = req.body.email;
      thongTinChungMoi.copyRight = req.body.copyRight;
      thongTinChungMoi.soDienThoai = req.body.soDienThoai;
      thongTinChungMoi.urlFacebook = req.body.urlFacebook;
      thongTinChungMoi.urlYoutube = req.body.urlYoutube;
      thongTinChungMoi.logo = req.body.uploads[0].src;
      thongTinChungMoi.logoMenuMobile = req.body.uploads[1].src;
      await thongTinChungMoi.save();
      res.json({
        message: "Tạo mới thông tin thành công",
      });
    } else {
      await ThongTinChung.findOneAndUpdate(
        { _id: req.body._id },
        {
          diaChi: req.body.diaChi,
          email: req.body.email,
          copyRight: req.body.copyRight,
          soDienThoai: req.body.soDienThoai,
          urlFacebook: req.body.urlFacebook,
          urlYoutube: req.body.urlYoutube,
          logo: req.body.uploads[0].src,
          logoMenuMobile: req.body.uploads[1].src,
        }
      );
      res.json({
        message: "Cập nhật thông tin thành công",
      });
    }
  } catch (error) {
    res.json({ message: "Cập nhật thông tin thất bại", error: error });
  }
}

router.post("/save", uploadPhotos, saveInformationsToDatabase);

router.get("/", async (req, res) => {
  try {
    const data = await ThongTinChung.find({});
    res.json({
      message: "Lấy thông tin chung thành công",
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Lấy thông tin chung thất bại",
      data: [],
    });
  }
});

module.exports = router;
