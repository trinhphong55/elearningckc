const router = require("express").Router();
const ChuDe = require("../models/ttthChuDe.model");

router.get("/", async (req, res) => {
  try {
    const danhSachChuDe = await ChuDe.find({ trangThai: 1 });
    res.json({
      message: "Lấy danh sách chủ đề thành công",
      data: danhSachChuDe,
    });
  } catch (error) {
    res.json({
      message: "Lấy danh sách chủ đề thất bại",
      data: [],
      error: error,
    });
  }
});

router.post("/", async (req, res) => {
  const data = new ChuDe(req.body);
  data.save();
  res.json({
    message: "Thêm chủ đề mới thành công",
  });
});

router.post("/edit", async (req, res) => {
  await ChuDe.findOneAndUpdate(
    { maChuDe: req.body.maChuDe },
    {
      tenChuDe: req.body.tenChuDe,
      tenVietTat: req.body.tenVietTat,
    }
  );
  res.json({
    message: "Chỉnh sửa chủ đề thành công",
  });
});

router.post("/delete", async (req, res) => {
  await ChuDe.findOneAndUpdate({ maChuDe: req.body.maChuDe }, { trangThai: 0 });
  res.json({
    message: "Xoá chủ đề thành công",
  });
});

module.exports = router;
