const router = require("express").Router();
const TienIch = require("../models/cnttTienIchSinhVien.model");

router.get("/danhsachtienich", async (req, res) => {
  try {
    const data = await TienIch.find().sort({ maTienIch: "asc" });
    res.json({ message: "Lấy danh sách bài viết thành công.", data: data });
  } catch (error) {
    res.json({
      message: "Lấy danh sách bài viết không thành công.",
      data: [],
      error: error,
    });
  }
});

router.get("/danhsachtienichcntt", (req, res) => {
  TienIch.find({ trangThai: 1 }, (error, data) => {
    if (error) {
      return res.json({
        message: "Lấy danh sách bài viết không thành công.",
        data: [],
        error: error,
      });
    }
    res.json({ message: "Lấy danh sách bài viết thành công.", data: data });
  });
});
router.post("/xoatienich", async (req, res) => {
  // console.log(" Xoa tien ich");
  // console.log(req.body.maTienIch);
  await TienIch.findOneAndUpdate(
    { maTienIch: req.body.maTienIch },
    {
      trangThai: 0,
    }
  );
  res.json({
    message: " Xóa tiện ích thành công",
  });
});

router.post("/taotienich", (req, res) => {
  var tienIch = new TienIch({
    maTienIch: req.body.maTienIch,
    tenTienIch: req.body.tenTienIch,
    urlTienIch: req.body.urlTienIch,
    iconClassTienIch: req.body.iconClassTienIch,
    maMauTienIch: req.body.maMauTienIch,
    trangthai: 1,
  });
  // console.log(tienIch);
  tienIch.save((err, data) => {
    if (err) {
      return next(err);
    }
    res.json(data);
  });
});

router.post("/chinhSuaTienIch", async (req, res) => {
  // console.log(" Chinh sua tien ich");
  await TienIch.findOneAndUpdate(
    { _id: req.body._id },
    {
      maTienIch: req.body.maTienIch,
      tenTienIch: req.body.tenTienIch,
      urlTienIch: req.body.urlTienIch,
      iconClassTienIch: req.body.iconClassTienIch,
      maMauTienIch: req.body.maMauTienIch,
      trangThai: 1,
    }
  );
  res.json({
    message: "Chỉnh sửa bài viết thành công",
  });
});
module.exports = router;
