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
    if (req.body._id === null) {
      const newHeader = new Header({
        icon1: req.body.icon1,
        name1: req.body.name1,
        url1: req.body.url1,
        icon2: req.body.icon2,
        name2: req.body.name2,
        url2: req.body.url2,
        icon3: req.body.icon3,
        name3: req.body.name3,
        url3: req.body.url3,
        icon4: req.body.icon4,
        name4: req.body.name4,
        url4: req.body.url4,
        icon5: req.body.icon5,
        name5: req.body.name5,
        url5: req.body.url5,
      });
      await newHeader.save();
      res.json({
        message: "Thêm thông tin header Khoa CNTT thành công",
        data: newHeader,
      });
    } else {
      await Header.findOneAndUpdate({ _id: req.body._id }, req.body);
      res.json({
        message: "Cập nhật thông tin header Khoa CNTT thành công",
        data: {
          _id: req.body._id,
        },
      });
    }
  } catch (error) {
    res.json({
      message: "Cập nhật thông tin header Khoa CNTT thất bại",
      data: [],
    });
  }
});
module.exports = router;
