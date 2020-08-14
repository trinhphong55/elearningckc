const router = require("express").Router();
const ttthtintuc = require("../models/ttthtintuc.model");
const multer = require("multer");
const convertString = require("../common/convertString");
const path = require("path");

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
  upload.single("photos")(req, res, function (error) {
    try {
      const photo = req.file;
      // check if photos are available
      if (!photo) {
        res.status(400).json({
          status: false,
          message: "No photo is selected.",
        });
      } else {
        req.body.image =
          "https://localhost:4100/" + photo.destination + photo.filename;
        next();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
}
//#endregion

// add tin tuc
router.post("/ttththemtintuc", uploadPhotos, (req, res) => {
  var tintuc = new ttthtintuc(req.body);
  tintuc.thoiGianTao = Date.now();
  tintuc.save((err, data) => {
    if (err) {
      return res.json({ message: "Lưu bài viết thất bại" });
    }
    res.json({ message: "Lưu bài viết thành công" });
  });
});

// sua tin tuc
router.post("/ttthsuatintuc", uploadPhotos, async (req, res) => {
  try {
    await ttthtintuc.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        id_loaitintuc: req.body.id_loaitintuc,
        image: req.body.image,
        tentintuc: req.body.tentintuc,
        tentintucASCII: req.body.tentintucASCII,
        description: req.body.description,
        noidung: req.body.noidung,
        noidungASCII: req.body.noidungASCII,
        thuTuHienThi: req.body.thuTuHienThi,
        trangthai: req.body.trangthai,
        nguoisua: req.body.nguoisua,
        thoiGianChinhSua: Date.now(),
      }
    );
    res.json({ message: "Chỉnh sửa bài viết thành công" });
  } catch (error) {
    res.json({ message: "Chỉnh sửa bài viết thất bại" });
  }
});

// xoa tin tuc
router.post("/ttthxoatintuc", async (req, res) => {
  try {
    await ttthtintuc.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        trangthai: false,
        thoiGianChinhSua: Date.now(),
      }
    );
    res.json({ message: "Xoá bài viết thành công" });
  } catch (error) {
    res.json({ message: "Xoá bài viết thất bại" });
  }
});

// get tin tuc
router.get("/ttthdanhsachtintuc", async (req, res) => {
  try {
    const danhSachTinTuc = await ttthtintuc
      .find()
      .sort({ thoiGianChinhSua: "desc" });
    res.json(danhSachTinTuc);
  } catch (error) {
    res.json([]);
  }
});

router.get("/tintucchinh", async (req, res) => {
  try {
    const tintucChinh = await ttthtintuc
      .find({ trangthai: true })
      .sort({ created_at: -1 })
      .limit(1);
    res.json(tintucChinh);
  } catch (error) {
    res.json([]);
  }
});
router.get("/tintucphu", async (req, res) => {
  try {
    const tintucPhu = await ttthtintuc
      .find({ trangthai: true })
      .sort({ created_at: -1 })
      .limit(4)
      .skip(1);
    res.json(tintucPhu);
  } catch (error) {
    res.json([]);
  }
});

router.get("/tintucttth/:id", (req, res) => {
  ttthtintuc.findById(req.params.id, (error, data) => {
    if (error) {
      return error;
    }
    res.json({ message: "Lấy bài viết thành công.", data: data });
  });
});

router.get("/tintucttthkhac", (req, res) => {
  ttthtintuc
    .find({ trangthai: true }, (error, data) => {
      if (error) {
        return res.json({
          message: "Lấy danh sách bài viết thành công.",
          data: [],
          error: error,
        });
      }
      res.json({ message: "Lấy danh sách bài viết thành công.", data: data });
    })
    .limit(3);
});

router.get("/tintucttth", (req, res) => {
  ttthtintuc.find({ trangthai: true }, (error, data) => {
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

// Loc code
router.get("/search=:query", async (req, res) => {
  try {
    const newRegExp = (pattern) => new RegExp(`.*${pattern}.*`);
    const regexQuery = newRegExp(req.params.query);
    const data = await ttthtintuc
      .find({
        trangthai: 1,
        tentintuc: { $regex: regexQuery, $options: "i" }, // i: không phân biệt chữ hoa & thường
      })
      .sort({
        updated_at: "desc", // asc || desc
      });
    res.json({
      message: "Tìm bài viết thành công",
      code: 200,
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Tìm bài viết thất bại",
      code: 400,
      data: data,
    });
  }
});

// Loc code
router.get("/chude=:maChuDe", async (req, res) => {
  try {
    // res.json(req.params);
    const data = await ttthtintuc
      .find({
        id_loaitintuc: req.params.maChuDe,
      })
      .sort({
        updatedAt: "desc", // asc || desc
      });
    res.json({
      message: "Lấy bài viết theo chủ đề thành công",
      code: 200,
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Lấy bài viết theo chủ đề thất bại",
      code: 400,
      data: [],
      error: error,
    });
  }
});

module.exports = router;
