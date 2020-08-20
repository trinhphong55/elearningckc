const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const SlideShow = require("../models/cnttSlideShow");

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
  // console.log("run uploadPhotos");
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

async function saveInformationsSlideShowToDatabase(req, res) {
  try {
    // console.log("run save infomartion");
    // console.log(req.body);
    const slideShow = new SlideShow();
    slideShow.maSlide = req.body.maSlide;
    slideShow.tenSlide = req.body.tenSlide;
    slideShow.danhSachHinhAnh = req.body.uploads;
    await slideShow.save();
    res.json({
      message: "Thêm slideshow thành công",
      data: slideShow,
    });
  } catch (error) {
    res.json({ message: "Thêm slide thất bại", error: error });
  }
}

router.post("/save", uploadPhotos, saveInformationsSlideShowToDatabase);

router.get("/", async (req, res) => {
  try {
    // console.log("Slideshow: Lay danh sach slideshow");
    const danhSachSlideShow = await SlideShow.find({});
    res.json({
      message: "Lấy danh sách slideshow thành công",
      data: danhSachSlideShow,
    });
  } catch (error) {
    res.json({
      message: "Lấy danh sách slideshow thất bại",
      data: [],
    });
  }
});

module.exports = router;
