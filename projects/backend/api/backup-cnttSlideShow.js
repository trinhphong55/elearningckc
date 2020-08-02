const router = require("express").Router();
const multer = require("multer");

//#region MULTER UPLOAD IMAGE
// upload file path
const FILE_PATH = "uploads/cntt/slideshow/";

// define multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_PATH);
  },
  filename: (req, file, cb) => {
    const filename = file.fieldname + "_" + Date.now() + file.originalname;
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

router.post("/save", upload.array("photos"), (req, res) => {
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
      // iterate over all photos
      photos.map((p) =>
        data.push({
          name: p.destination + p.originalname,
        })
      );
      // send response
      res.json({
        status: true,
        message: "Photos are uploaded.",
        data: data,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
//#endregion

router.get("/", (req, res) => {
  res.json({ message: "Hello from Cao Thang API slideshow" });
});

module.exports = router;
