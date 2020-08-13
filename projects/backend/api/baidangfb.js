const baidangfb = require("../models/baidangfb.model");
const { check, validationResult } = require("express-validator");

// get tất cả trong db QLBaiDangFB
exports.getAll= async (req,res)=>{
  try {
      const data = await baidangfb.find();
      res.json(data);
    } catch (error) {
      res.json({message: err});
    }
};
//Thêm vào draw
exports.postToDrawFB = async (req, res) => {
  try {
    const err = validationResult(req);
    if(!err.isEmpty()){
      res.status(422).json(err.errors);
    }

      const posttodrawfbs = new baidangfb({
        ID:req.body.ID,
        message: req.body.message,
        url: req.body.url,
        maLoai:req.body.maLoai,
        loai:req.body.loai,
        thuoc:req.body.thuoc

      });
      const savePostToDraw = await posttodrawfbs.save();
      res.json({
        status: 200,
        ok:true,
        msg: "Thêm thành công vào draw",
        data: savePostToDraw,
      });
  }catch(error){
    console.log(res.json.error);
    res.json(error);
  }
};
//Delete bai post
exports.deletePostFB = async (req, res) => {
  try {

    const updatePosted = await baidangfb.updateOne(
      { _id: req.params.id },
      {
        $set: {
          trangThai: 0,
        },
      }
    );

    let  result = {
    };

    if (updatePosted.nModified === 0) {
      result = {
        status: false,
        msg: "Xóa thất bại",
      };
    } else {
      result = {
        status: true,
        msg: "Xóa thành công ",
      };
    }
    res.status(200).json(result);
  } catch (error) {
    res.json(error);
  }
};
//Thêm vào posted
exports.postedToFB = async (req, res) => {
  try {
    const err = validationResult(req);
    if(!err.isEmpty()){
      res.status(422).json(err.errors);
    }

      const postedtofbs = new baidangfb({
        ID:req.body.ID,
        postID: req.params.postID,
        link:req.body.link,
        message: req.body.message,
        url: req.body.url,
        maLoai:req.body.maLoai,
        loai:req.body.loai,
        thuoc:req.body.thuoc,
        trangThai:2
      });
      const savePosted = await postedtofbs.save();
      res.json({
        status: 200,
        ok:true,
        msg: "Thêm thành công vào post",
        data: savePosted,
      });
  }catch{
    res.json(error);
  }
};
// Update posted to Facebook
exports.updatePostedFB = async (req, res) => {
  try {

    const err = validationResult(req);
    if(!err.isEmpty()){
      res.status(422).json(err.errors);
    }
    console.log(req.body);

    const updatePosted = await baidangfb.update(
      { postID: req.params.id },
      {
        $set: {
          link: req.body.link,
          message: req.body.message,
          url: req.body.url,
          maLoai:req.body.maLoai,
          loai:req.body.loai
        },
      }
    );

    let  result = {
      status: 200,
      ok: false,
      msg: "",
    };

    if (updatePosted.nModified === 0) {
      result.msg = "Chưa được cập nhật trong posted";

    } else {
      result.ok = true;
      result.msg ="Cập nhật thành công posted to Facebook";

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
    if(!err.isEmpty()){
      res.status(422).json(err.errors);
    }
    console.log(req.body);

    const updatePosted = await baidangfb.updateOne(
      { _id: req.params.id },
      {
        $set: {
          trangThai:2
        },
      }
    );

    let  result = {
      status: 200,
      ok: false,
      msg: "",
    };

    if (updatePosted.nModified === 0) {
      result.msg = "Cập nhật từ draw to posted không thành công";

    } else {
      result.ok = true;
      result.msg ="Cập nhật thành công từ draw to posted";

    }
    res.status(200).json(result);
  } catch (error) {
    res.json(error);
  }
};

