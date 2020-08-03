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
    if (req.body._id !== null) {
      console.log(req.body._id);
      await Footer.findOneAndUpdate(
        { _id: req.body._id },
        req.body
        // {
        //   name1: req.body.name1,
        //   url1: req.body.url1,
        //   sub1: req.body.sub1,
        //   name2: req.body.name2,
        //   url2: req.body.url2,
        //   sub2: req.body.sub2,
        //   name3: req.body.name3,
        //   url3: req.body.url3,
        //   sub3: req.body.sub3,
        // }
      );
      res.json({
        message: "Cập nhật thông tin footer Khoa CNTT thành công",
        data: req.body._id,
      });
    } else {
      const newFooter = new Footer(req.body);
      newFooter.save();
      res.json({
        message: "Thêm thông tin footer mới Khoa CNTT thành công",
        data: newFooter,
      });
    }
  } catch (error) {
    res.json({
      message: "Cập nhật thông tin footer Khoa CNTT thất bại",
      data: [],
      code: 400,
    });
  }
});
module.exports = router;
