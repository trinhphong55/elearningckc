const router = require("express").Router();
const DanhMuc = require("../models/cnttDanhMuc.model");

router.get("/", async (req, res) => {
  try {
    const danhSachDanhMuc = await DanhMuc.find({ trangThai: 1 });
    // console.log("DanhMuc: Lay danh sach danh muc");
    res.json({
      message: "Lấy danh sách danh mục thành công",
      data: danhSachDanhMuc,
    });
  } catch (error) {
    res.json({
      message: "Lấy danh sách danh mục thất bại",
      data: [],
      error: error,
    });
  }
});

router.post("/", async (req, res) => {
  // console.log("DanhMuc: Them danh muc moi");
  // console.log(req.body);
  const danhMuc = new DanhMuc(req.body);
  danhMuc.save();
  res.json({
    message: "Thêm danh mục mới thành công",
  });
});

router.post("/edit", async (req, res) => {
  // console.log("DanhMuc: Chinh sua danh muc");
  // console.log(req.body);
  await DanhMuc.findOneAndUpdate(
    { maDanhMuc: req.body.maDanhMuc },
    {
      tenDanhMuc: req.body.tenDanhMuc,
      tenVietTat: req.body.tenVietTat,
    }
  );
  res.json({
    message: "Chỉnh sửa danh mục thành công",
  });
});

router.post("/delete", async (req, res) => {
  // console.log("DanhMuc: Xoa danh muc");
  // console.log(req.body);
  await DanhMuc.findOneAndUpdate(
    { maDanhMuc: req.body.maDanhMuc },
    { trangThai: 0 }
  );
  res.json({
    message: "Xoá danh mục thành công",
  });
});

module.exports = router;
