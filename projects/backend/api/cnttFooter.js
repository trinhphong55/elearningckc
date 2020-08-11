const router = require("express").Router();
const Footer = require("../models/cnttFooter");

// Get all
router.get("/", async (req, res) => {
  try {
    const data = await Footer.find({});
    res.json({
      message: "Lấy thông tin footer Khoa CNTT thành công",
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Lấy thông tin footer Khoa CNTT thất bại",
      data: [],
      code: 400,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    if (req.body._id === null) {
      const newFooter = new Footer({
        icon1: req.body.icon1,
        name1: req.body.name1,
        url1: req.body.url1,
        icon2: req.body.icon2,
        name2: req.body.name2,
        url2: req.body.url2,
        icon3: req.body.icon3,
        name3: req.body.name3,
        url3: req.body.url3,
      });
      newFooter.save();
      res.json({
        message: "Thêm thông tin footer mới Khoa CNTT thành công",
        data: newFooter,
      });
    } else {
      await Footer.findOneAndUpdate({ _id: req.body._id }, req.body);
      res.json({
        message: "Cập nhật thông tin footer Khoa CNTT thành công",
        data: {
          _id: req.body._id,
        },
      });
    }
  } catch (error) {
    res.json({
      message: "Cập nhật thông tin footer Khoa CNTT thất bại",
      data: [],
    });
  }
});
module.exports = router;
