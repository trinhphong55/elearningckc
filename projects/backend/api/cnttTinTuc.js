const router = require("express").Router();
const TinTuc = require("../models/cntttintuc.model");
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
        req.body.anhBia = FILE_PATH + "default.png";
        next();
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

module.exports = function (io) {
  router.post("/taotintuc", uploadPhotos, async (req, res) => {
    try {
      const _baiVietMoi = new TinTuc(req.body);
      _baiVietMoi.thoiGianDangBai = Date.now();
      await _baiVietMoi.save();
      if (_baiVietMoi.maDanhMuc === "DM09") {
        io.sockets.emit(
          "ThongBaoKhanCap",
          "Đã có thông báo mới, kiểm tra lại ngay!"
        );
      }
      res.json({
        message: "Thêm bài viết mới thành công",
        code: 200,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: "Thêm bài viết thất bại",
        code: 400,
        error: error,
      });
    }
  });

  router.post("/chinhSuaTinTuc", uploadPhotos, async (req, res) => {
    try {
      // console.log(req.body);
      await TinTuc.findOneAndUpdate(
        { _id: req.body._id },
        {
          maBaiViet: req.body.maBaiViet,
          anhBia: req.body.anhBia,
          maDanhMuc: req.body.maDanhMuc,
          loaiBaiViet: req.body.loaiBaiViet,
          tieuDe: req.body.tieuDe,
          tieuDeASCII: req.body.tieuDeASCII,
          moTaNgan: req.body.moTaNgan,
          noiDung: req.body.noiDung,
          noiDungASCII: req.body.noiDungASCII,
          nguoiViet: req.body.nguoiViet,
          viTriHienThi: req.body.viTriHienThi,
          thuTuHienThi: req.body.thuTuHienThi,
          trangThai: req.body.trangThai,
        }
      );
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

  // Xoá bài viết
  router.post("/xoatintuc", async (req, res) => {
    try {
      await TinTuc.findOneAndUpdate(
        { maBaiViet: req.body.maBaiViet },
        {
          trangThai: 0,
        }
      );
      res.json({
        message: " Xóa bài viết thành công",
        code: 200,
      });
    } catch (error) {
      res.json({
        message: " Xóa bài viết thất bại",
        code: 200,
        error: error,
      });
    }
  });

  // kiểm tra trùng mã bài viết
  router.get("/maBaiViet=:maBaiViet", async (req, res) => {
    try {
      const danhSachBaiViet = await TinTuc.find();
      const result = danhSachBaiViet.filter(
        (x) => x.maBaiViet === req.params.maBaiViet
      );
      if (result.length > 0) {
        res.json({ code: 400, message: "Đã tồn tại" });
      } else {
        res.json({ code: 200, message: "Có thể sử dụng mã bài viết này" });
      }
    } catch (error) {
      res.json({ code: 400, data: [] });
    }
  });

  // Get All Tintuc => hiển thị tất cả bài viết lên "quản lý bài viết"
  router.get("/danhsachtintuc", async (req, res) => {
    try {
      const data = await TinTuc.find().sort({ maBaiViet: "asc" });
      res.json({
        message: "Lấy danh sách bài viết thành công.",
        domain: req.headers.host,
        data: data,
      });
    } catch (error) {
      res.json({
        message: "Lấy danh sách bài viết thất bại.",
        data: [],
        error: error,
      });
    }
  });

  router.get("/danhsachtintucmoinhat", async (req, res) => {
    try {
      const data = await TinTuc.find()
        .sort({ thoiGianDangBai: "asc" })
        .limit(10);
      res.json({
        message: "Lấy danh sách bài viết thành công.",
        data: data,
      });
    } catch (error) {
      res.json({
        message: "Lấy danh sách bài viết thất bại.",
        data: [],
        error: error,
      });
    }
  });

  router.get("/danhsachtintuctheothutuhienthi", async (req, res) => {
    try {
      const data = await TinTuc.find().sort({ thuTuHienThi: "asc" });
      res.json({
        message: "Lấy danh sách bài viết thành công.",
        domain: req.headers.host,
        data: data,
      });
    } catch (error) {
      res.json({
        message: "Lấy danh sách bài viết thành công.",
        data: [],
        error: error,
      });
    }
  });

  router.get("/danhsachtintuckhac", (req, res) => {
    TinTuc.find({ trangThai: 1 }, (error, data) => {
      if (error) {
        return res.json({
          message: "Lấy danh sách bài viết thành công.",
          data: [],
          error: error,
        });
      }
      res.json({ message: "Lấy danh sách bài viết thành công.", data: data });
    }).limit(5);
  });

  router.get("/tintucnoibatcntt", (req, res) => {
    TinTuc.find({ trangThai: 1 }, (error, data) => {
      if (error) {
        return res.json({
          message: "Lấy danh sách bài viết thành công.",
          data: [],
          error: error,
        });
      }
      res.json({ message: "Lấy danh sách bài viết thành công.", data: data });
    })
      .sort({ _id: -1 })
      .limit(10);
  });

  //get all tin tuc > 4300
  router.get("/danhsachtintuccntt", (req, res) => {
    TinTuc.find({ trangThai: 1 }, (error, data) => {
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
  router.get("/danhsachthongbaocntt", (req, res) => {
    TinTuc.find({ trangThai: 1, maDanhMuc: "DM09" }, (error, data) => {
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
  router.get("/danhsachtailieucntt", (req, res) => {
    TinTuc.find({ trangThai: 1, maDanhMuc: "DM010" }, (error, data) => {
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
  router.get("/danhsachtkbcntt", (req, res) => {
    TinTuc.find({ trangThai: 1, maDanhMuc: "DM11" }, (error, data) => {
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
  router.get("/danhsachjobcntt", (req, res) => {
    TinTuc.find({ trangThai: 1, maDanhMuc: "DM01" }, (error, data) => {
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
  router.get("/tintucmoinhat", async (req, res) => {
    const data = await TinTuc.find({ trangThai: 1 }).limit(10).sort({
      updatedAt: "desc", // asc || desc
    });
    res.json({ message: "Lấy danh sách bài viết thành công.", data: data });
  });

  // Get Tintuc by id
  router.get("/tintuc/:id", (req, res) => {
    TinTuc.findById(req.params.id, (error, data) => {
      if (error) {
        return error;
      }
      res.json({ message: "Lấy bài viết thành công.", data: data });
    });
  });

  //#region API
  router.get("/danhmuc=:maDanhMuc", async (req, res) => {
    try {
      // res.json(req.params);
      const data = await TinTuc.find({
        maDanhMuc: req.params.maDanhMuc,
      }).sort({
        updatedAt: "desc", // asc || desc
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
      }).sort({
        updatedAt: "desc", // asc || desc
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
        trangThai: 1,
      }).sort({
        updatedAt: "desc", // asc || desc
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

  router.get("/search=:query", async (req, res) => {
    try {
      const newRegExp = (pattern) => new RegExp(`.*${pattern}.*`);
      const ascii = convertString.toASCII(req.params.query, null);
      const regexQuery = newRegExp(ascii);
      const data = await TinTuc.find()
        .or([
          {
            tieuDeASCII: { $regex: regexQuery, $options: "i" }, // i: không phân biệt chữ hoa & thường
          },
          {
            noiDungASCII: { $regex: regexQuery, $options: "i" }, // i: không phân biệt chữ hoa & thường
          },
        ])
        .and([
          {
            trangThai: 1,
          },
        ])
        .sort({
          updatedAt: "desc", // asc || desc
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
  //#endregion

  // API cho nhóm FB
  router.get("/sharedanhsachbaiviet", async (req, res) => {
    try {
      const data = await TinTuc.find({ trangThai: 1 }, { tieuDe: 1, _id: 1 });
      const result = [];
      for (const item of data) {
        const url = `http://localhost:4300/bai-viet/${item._id}`;
        result.push({
          tieuDe: item.tieuDe,
          url: url,
        });
      }
      res.json({
        message: "Lấy danh sách bài viết nhóm FB thành công.",
        data: result,
      });
    } catch (error) {
      res.json({
        message: "Lấy danh sách bài viết nhóm FB thất bại",
        data: [],
        error: error,
      });
    }
  });
  return router;
};

// module.exports = router;
