const router = require('express').Router()
const ttthtintuc = require('../models/ttthtintuc.model');
const multer = require('multer')

// get tin tuc
router.get('/ttthdanhsachtintuc', async (req, res) => {

  try {
    const danhSachTinTuc = await ttthtintuc.find({ trangthai: true });
    res.json(danhSachTinTuc);
  } catch (error) {
    res.json([]);
  }
})
router.get('/tintucchinh', async (req,res) =>{
  try {
    const tintucChinh = await ttthtintuc.find({trangthai: true}).sort({created_at: -1}).limit(1);
    res.json(tintucChinh);
  } catch (error) {
    res.json([]);
  }
})
router.get('/tintucphu', async (req,res) =>{
  try {
    const tintucPhu = await ttthtintuc.find({trangthai: true}).sort({created_at: -1}).limit(4).skip(1);
    res.json(tintucPhu);
  } catch (error) {
    res.json([]);
  }
})
// add tin tuc
router.post('/ttththemtintuc', (req, res) => {
  var tintuc = new ttthtintuc({
    id_loaitintuc: req.body.id_loaitintuc,
    image: req.body.image,
    tentintuc: req.body.tentintuc,
    slug: req.body.slug,
    description: req.body.description,
    noidung: req.body.noidung,
    hienthi: req.body.hienthi,
    trangthai: req.body.trangthai,
    nguoitao: req.body.nguoitao,
    nguoisua: req.body.nguoisua,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
  })
  tintuc.save((err, data) => {
    if (err) {
      return next(err)
    }
    res.json(data)
  })
})
// File upload settings

const PATH = './uploads/cntt';

let Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, PATH);
  },
  filename: (req, file, callback) => {
    let math = ["image/png", "image/jpeg"];
    if (math.indexOf(file.mimetype) === -1) {
      let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
      return callback(errorMess, null);
    }
    let filename = `${file.originalname}`;
    callback(null, filename);
  }
});
var upload = multer({
  storage: Storage
})
router.post('/uploads', upload.single('image'), function (req, res) {

  if (!req.file) {
    // console.log("No file is available!");
    return res.send({
      success: false
    });
  }
  // console.log('filename:  ' + req.file.filename);
  // console.log('File is available!');
  res.send({
    success: true,
  })
});
// sua tin tuc
router.post('/ttthsuatintuc', async (req, res) => {
  await ttthtintuc.findOneAndUpdate({
    _id: req.body._id
  }, {
    id_loaitintuc: req.body.id_loaitintuc,
    image: req.body.image,
    tentintuc: req.body.tentintuc,
    slug: req.body.slug,
    description: req.body.description,
    noidung: req.body.noidung,
    hienthi: req.body.hienthi,
    trangthai: req.body.trangthai,
    nguoitao: req.body.nguoitao,
    nguoisua: req.body.nguoisua,
    updated_at: req.body.updated_at,
  });
})
// xoa tin tuc
router.post('/ttthxoatintuc', async (req, res) => {
  await ttthtintuc.findOneAndUpdate({
    _id: req.body._id
  }, {
    trangthai: false
  });
})
router.get("/tintucttth/:id", (req, res) => {
  ttthtintuc.findById(req.params.id, (error, data) => {
    if (error) {
      return error;
    }
    res.json({ message: "Lấy bài viết thành công.", data: data });
  });
});
router.get("/tintucttthkhac", (req, res) => {
  ttthtintuc.find({trangthai: true},(error, data) => {
    if (error) {
      return res.json({
        message: "Lấy danh sách bài viết thành công.",
        data: [],
        error: error,
      });
    }
    res.json({ message: "Lấy danh sách bài viết thành công.", data: data });
  }).limit(3);
});
router.get("/tintucttth", (req, res) => {
  ttthtintuc.find({trangthai: true},(error, data) => {
    if (error) {
      return res.json({
        message: "Lấy danh sách bài viết thành công.",
        data: [],
        error: error,
      });
    }
    res.json({ message: "Lấy danh sách bài viết thành công.", data: data });
  });
});
router.get("/search=:query", async (req, res) => {
  try {
    const newRegExp = (pattern) => new RegExp(`.*${pattern}.*`);
    const regexQuery = newRegExp(req.params.query);
    const data = await ttthtintuc.find({
      trangthai: 1,
      tentintuc: { $regex: regexQuery, $options: "i" }, // i: không phân biệt chữ hoa & thường
    }).sort({
      updated_at: "desc", // asc || desc
    });
    res.json({
      message: "Tìm bài viết thành công",
      code: 200,
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Tìm bài viết thất bại",
      code: 400,
      data: data,
    });
  }
});

module.exports = router
