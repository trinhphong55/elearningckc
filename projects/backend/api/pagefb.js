const pagefb = require("../models/pagefb.model");
const { check, validationResult } = require("express-validator");

// get tất cả trong db PageFB
exports.getAll= async (req,res)=>{
  try {
      const data = await pagefb.find({trangThai: "1"});
      res.json(data);
    } catch (error) {
      res.json({error});
    }
};
//add vào db PageFB
exports.postPageFB = async (req, res) => {
  try {
    const err = validationResult(req);
    if(!err.isEmpty()){
      res.status(422).json(err.errors);
    }
    const pagefbf = await pagefb.find();

    pagefbf.forEach((element) => {
      if (req.body.id_Page === element.id_Page) {
        res.json({
          status: 200,
          ok:false,
          msg: "ID trang này đã tồn tại",
        });
      }
      if (req.body.tenPage === element.tenPage) {
        res.json({
          status: 200,
          ok:false,
          msg1: "Tên trang này đã tồn tại",
        });
      }
    });
      const pagefbs = new pagefb({
        id_Page:req.body.id_Page,
        tenPage: req.body.tenPage,
        linkPage:req.body.linkPage,
        accessTokenPage: req.body.accessTokenPage
      });
      const savePage = await pagefbs.save();
      res.json({
        status: 200,
        ok:true,
        msg2: "Thêm thành công trang Facebook vào danh sách",
        data: savePage,
      });
  }catch{
    res.json({
      status:404,
      ok:false,
      msg3:'Không được để trống thông tin '
    });
  }
};
//Update Page Facebook
exports.updatePageFB = async (req, res) => {
  try {

    const err = validationResult(req);
    if(!err.isEmpty()){
      res.status(422).json(err.errors);
    }
    // console.log(req.body);

    const updatePage = await pagefb.update(
      { _id: req.params.id },
      {
        $set: {
          id_Page: req.body.id_Page,
          tenPage: req.body.tenPage,
          linkPage: req.body.linkPage,
          accessTokenPage: req.body.accessTokenPage,
        },
      }
    );

    let  result = {
      status: 200,
      ok: false,
      msg: "",
    };

    if (updatePage.nModified === 0) {
      result.msg = "Chưa được cập nhật";

    } else {
      result.ok = true;
      result.msg ="Cập nhật thành công Page Facebook";

    }
    res.status(200).json(result);
  } catch{
    res.json({
      status:404,
      ok:false,
      msg:'Không được để trống thông tin'
    });
  }
};
//Delete Page Facebook
exports.deletePageFB = async (req, res) => {
  try {

    const updatePage = await pagefb.updateOne(
      { _id: req.params.id },
      {
        $set: {
          trangThai: 0,
        },
      }
    );

    let  result = {
    };

    if (updatePage.nModified === 0) {
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
