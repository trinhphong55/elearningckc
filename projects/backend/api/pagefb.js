const pagefb = require("../models/pagefb.model");
const { check, validationResult } = require("express-validator");

// get tất cả trong db PageFB
exports.getAll= async (req,res)=>{
  try {
      const data = await pagefb.find({trangThai: "1"});
      res.json(data);
    } catch (error) {
      res.json({message: err});
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
          msg: "Page ID này đã tồn tại",
        });
      }
      if (req.body.tenPage === element.tenPage) {
        res.json({
          status: 200,
          ok:false,
          msg: "Tên Page này đã tồn tại",
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
        msg: "Thêm thành công Page Facebook vào danh sách",
        data: savePage,
      });
  }catch{
    res.json(error);
  }
};
