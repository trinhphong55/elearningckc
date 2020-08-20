const baidangfb = require("../models/baidangfb.model");
const { check, validationResult } = require("express-validator");

// get tất cả trong db QLBaiDangFB
exports.getAll = async (req, res) => {
  try {
    const data = await baidangfb
      .find({ trangThai: { $ne: 0 } })
      .sort({ ngayTao: -1 });
    //console.log(data);
    res.json(data);
  } catch (error) {
    res.json({ error });
  }
};
//Thêm vào draw
exports.postToDrawFB = async (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(422).json(err.errors);
    }

    const posttodrawfbs = new baidangfb({
      ID: req.body.ID,
      message: req.body.message,
      url: req.body.url,
      postOf: req.body.postOf,
      maLoai: req.body.maLoai,
      loai: req.body.loai,
      thuoc: req.body.thuoc,
    });
    const savePostToDraw = await posttodrawfbs.save();

    res.json({
      status: 200,
      ok: true,
      msg1: "Thêm thành công vào nháp",
      data: savePostToDraw,
    });
  } catch  {
    
    res.json({
      status: 200,
      ok: true,
      msg: "Thêm không thành công vào nháp",
    });
  }
};
//Delete bai post
exports.deletePostFB = async (req, res) => {
  //console.log("22");
  try {
    const updatePosted = await baidangfb.updateOne(
      { postID: req.params.postID },
      {
        $set: {
          trangThai: 0,
        },
      }
    );

    let result = {};

    if (updatePosted.nModified === 0) {
      result = {
        status: false,
        msg: "Xóa bài viết đã đăng thất bại",
      };
    } else {
      result = {
        status: true,
        msg1: "Xóa bài viết đã đăng thành công ",
      };
    }
    res.status(200).json(result);
  } catch (error) {
    res.json(error);
  }
};
//Thêm vào posted
exports.postedToFB = async (req, res) => {
  //console.log(req.body);
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(422).json(err.errors);
    }

    const postedtofbs = new baidangfb({
      ID: req.body.ID,
      postID: req.body.postID,
      link: req.body.link,
      message: req.body.message,
      url: req.body.url,
      postOf: req.body.postOf,
      maLoai: req.body.maLoai,
      loai: req.body.loai,
      thuoc: req.body.thuoc,
      trangThai: 2,
    });
    const savePosted = await postedtofbs.save();
    res.json({
      status: 200,
      ok: true,
      msg1: "Thêm thành công vào bài đã đăng",
      data: savePosted,
    });
  } catch {
    res.json({
      status: 404,
      ok: false,
      msg: "Thêm không thành công vào bài đã đăng",
      data: savePosted,
    });
  }
};
// Update posted to Facebook
exports.updatePostedFB = async (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(422).json(err.errors);
    }
    const updatePosted = await baidangfb.update(
      { postID: req.params.postID },
      {
        $set: {
          link: req.body.link,
          message: req.body.message,
          url: req.body.url,
          postOf: req.body.postOf,
          maLoai: req.body.maLoai,
          loai: req.body.loai,
          thuoc: req.body.thuoc,
        },
      }
    );

    let result = {
      status: 200,
      ok: false,
      msg: "",
    };

    if (updatePosted.nModified === 0) {
      result.msg = "Chưa được cập nhật trong bài đã đăng";
    } else {
      result.ok = true;
      result.msg = "Cập nhật thành công bài đã đăng";
    }
    res.status(200).json(result);
  } catch (error) {
    res.json(error);
  }
};
// Update from draw to posted
exports.updateDrawToPosted = async (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(422).json(err.errors);
    }
    //console.log(req.body);

    const updatePosted = await baidangfb.updateOne(
      { _id: req.params.id },
      {
        $set: {
          postID: req.body.postID,
          link: req.body.link,
          trangThai: 2,
        },
      }
    );

    let result = {
      status: 200,
      ok: false,
      msg: "",
    };

    if (updatePosted.nModified === 0) {
      result.msg = "Cập nhật từ nháp sang đã đăng không thành công";
    } else {
      result.ok = true;
      result.msg1 = "Cập nhật thành công từ nháp sang đã đăng";
    }
    res.status(200).json(result);
  } catch (error) {
    res.json(error);
  }
};
//Delete draw
exports.deleteDrawFB = async (req, res) => {
  try {
    //console.log(req.params.id);
    const updateDrawed = await baidangfb.updateOne(
      { _id: req.params.id },
      {
        $set: {
          trangThai: 0,
        },
      }
    );

    let result = {};

    if (updateDrawed.nModified === 0) {
      result = {
        status: false,
        msg: "Xóa bản lưu thất bại",
      };
    } else {
      result = {
        status: true,
        msg: "Xóa bản lưu thành công ",
      };
    }
    res.status(200).json(result);
  } catch (error) {
    res.json(error);
  }
};
// Update draw
exports.updateDrawFB = async (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(422).json(err.errors);
    }
    //console.log(req.body);

    const updateDrawed = await baidangfb.update(
      { _id: req.params.id },
      {
        $set: {
          link: req.body.link,
          message: req.body.message,
          url: req.body.url,
          postOf: req.body.postOf,
          maLoai: req.body.maLoai,
          loai: req.body.loai,
        },
      }
    );

    let result = {
      status: 200,
      ok: false,
      msg: "",
    };

    if (updateDrawed.nModified === 0) {
      result.msg = "Chưa được cập nhật trong bản lưu nháp";
    } else {
      result.ok = true;
      result.msg = "Cập nhật thành công trong bản lưu nháp";
    }
    res.status(200).json(result);
  } catch (error) {
    res.json(error);
  }
};
