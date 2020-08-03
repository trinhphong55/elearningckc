const router = require("express").Router();
const Header = require("../models/cnttHeader");

// Get all
router.get("/", async (req, res) => {
  try {
    const data = await Header.find({});
    res.json({
      message: "Lấy thông tin header Khoa CNTT thành công",
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Lấy thông tin header Khoa CNTT thất bại",
      data: [],
      code: 400,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    if (req.body._id !== null) {
      await Header.findOneAndUpdate({ _id: req.body._id }, req.body);
      res.json({
        message: "Cập nhật thông tin header Khoa CNTT thành công",
      });
    } else {
      const newHeader = new Header(req.body);
      newHeader.save();
      res.json({
        message: "Thêm thông tin header Khoa CNTT thành công",
        data: newHeader,
      });
    }
  } catch (error) {
    res.json({
      message: "Cập nhật thông tin header Khoa CNTT thất bại",
      data: [],
      code: 400,
    });
  }
});
module.exports = router;
