const router = require("express").Router();
const TinTuc = require("../models/cntttintuc.model");

router.get("/all", async (req, res) => {
  try {
    const data = await TinTuc.find({
      trangThai: 1,
      $or: [
        { viTriHienThi: 0 },
        { viTriHienThi: 1 },
        { viTriHienThi: 2 },
        { viTriHienThi: 3 },
        { viTriHienThi: 4 },
      ],
    }).sort({ thuTuHienThi: "asc" });
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
    const data = await TinTuc.find({ viTriHienThi: 0 }).sort({
      updatedAt: "desc", // asc || desc
    });
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
    const data = await TinTuc.find({ viTriHienThi: 1 }).sort({
      updatedAt: "desc", // asc || desc
    });
    res.json({
      message: "Trang chủ: Lấy bài viết việc làm thành công",
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Trang chủ: Lấy bài viết việc làm thất bại",
      data: [],
      error: error,
    });
  }
});

// 2
router.get("/gioithieungan", async (req, res) => {
  try {
    const data = await TinTuc.find({ viTriHienThi: 2 }).sort({
      updatedAt: "desc", // asc || desc
    });
    res.json({
      message: "Trang chủ: Lấy bài viết giới thiệu ngắn thành công",
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Trang chủ: Lấy bài viết giới thiệu ngắn thất bại",
      data: [],
      error: error,
    });
  }
});

// 3
router.get("/baivietnoibat", async (req, res) => {
  try {
    const data = await TinTuc.find({ viTriHienThi: 3 }).sort({
      updatedAt: "desc", // asc || desc
    });
    res.json({
      message: "Trang chủ: Lấy bài viết nổi bật thành công",
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Trang chủ: Lấy bài viết nổi bật thất bại",
      data: [],
      error: error,
    });
  }
});

// 4
router.get("/baivietmoinhat", async (req, res) => {
  try {
    const data = await TinTuc.find({})
      .sort({
        updatedAt: "desc", // asc || desc
      })
      .limit(10);
    res.json({
      message: "Trang chủ: Lấy bài viết mới nhất thành công",
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Trang chủ: Lấy bài viết mới nhất thất bại",
      data: [],
      error: error,
    });
  }
});

module.exports = router;
