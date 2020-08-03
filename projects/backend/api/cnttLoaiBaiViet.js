const router = require("express").Router();
const LoaiBaiViet = require("../models/cnttLoaiBaiViet.model");

router.get("/", async (req, res) => {
  try {
    const danhSachLoaiBaiViet = await LoaiBaiViet.find({ trangThai: 1 });
    // console.log("LoaiBaiViet: Danh sach loai bai viet");
    res.json({
      message: "Lấy danh sách Loại bài viết thành công",
      data: danhSachLoaiBaiViet,
    });
  } catch (error) {
    res.json({
      message: "Lấy danh sách Loại bài viết thất bại",
      data: [],
      error: error,
    });
  }
});

router.post("/", async (req, res) => {
  // console.log("LoaiBaiViet: Them loai bai viet moi");
  // console.log(req.body);
  const loaiBaiViet = new LoaiBaiViet(req.body);
  loaiBaiViet.save();
  res.json({
    message: "Thêm loại bài viết mới thành công",
  });
});

router.post("/edit", async (req, res) => {
  // console.log("LoaiBaiViet: Chinh sua loai bai viet");
  // console.log(req.body);
  await LoaiBaiViet.findOneAndUpdate(
    { maLoaiBaiViet: req.body.maLoaiBaiViet },
    {
      tenLoaiBaiViet: req.body.tenLoaiBaiViet,
      tenVietTat: req.body.tenVietTat,
    }
  );
  res.json({
    message: "Chỉnh sửa loại bài viết thành công",
  });
});

router.post("/delete", async (req, res) => {
  // console.log("LoaiBaiViet: Xoa loai bai viet");
  // console.log(req.body);
  await LoaiBaiViet.findOneAndUpdate(
    { maLoaiBaiViet: req.body.maLoaiBaiViet },
    { trangThai: 0 }
  );
  res.json({
    message: "Xoá loại bài viết thành công",
  });
});

module.exports = router;
