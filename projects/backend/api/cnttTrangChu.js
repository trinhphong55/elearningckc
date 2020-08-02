const router = require("express").Router();
const TinTuc = require("../models/cntttintuc.model");

router.get("/all", async (req, res) => {
  try {
    const data = await TinTuc.find({
      $or: [
        { viTriHienThi: 0 },
        { viTriHienThi: 1 },
        { viTriHienThi: 2 },
        { viTriHienThi: 3 },
        { viTriHienThi: 4 },
      ],
    });
    res.json({
      message: "Lấy bài viết cần hiển thị lên Trang chủ thành công.",
      code: 200,
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Lấy bài viết cần hiển thị lên Trang chủ thất bại.",
      code: 400,
      data: [],
      error: error,
    });
  }
});

// 0
router.get("/baivietquantrong", async (req, res) => {
  try {
    const data = await TinTuc.find({ viTriHienThi: 0 });
    res.json({
      message: "Trang chủ: Lấy bài viết quan trọng thành công",
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Trang chủ: Lấy bài viết quan trọng thất bại",
      data: [],
      error: error,
    });
  }
});

// 1
router.get("/cohoivieclam", async (req, res) => {
  try {
  } catch (error) {}
});

// 2
router.get("/gioithieungan", async (req, res) => {
  try {
  } catch (error) {}
});

// 3
router.get("/baivietnoibat", async (req, res) => {
  try {
  } catch (error) {}
});

// 4
router.get("/baivietmoinhat", async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;