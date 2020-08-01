const router = require("express").Router();
const BoSuuTap = require("../models/cnttBoSuuTap.model");
const multer = require("multer");
const PATH = "./uploads/cntt";

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
    },
});
var upload = multer({
    storage: Storage,
});

router.post("/uploads", upload.single("image"), function (req, res) {
    if (!req.file) {
        console.log("No file is available!");
        return res.send({
            success: false,
        });
    }
    console.log("filename:  " + req.file.filename);
    console.log("File is available!");
    res.send({
        success: true,
    });
});

router.post("/taobst", (req, res) => {
    //console.log("req.body.anhBia  " + req.body.anhBia);
    //var imgName = req.body.anhBia.slice(12);
    var boSuuTap = new BoSuuTap({
        maBST: req.body.maBST,
        url: req.body.url,
        alt: req.body.alt,
        //src: "uploads/cntt/" + imgName,
        trangThai : 1
    });
    console.log(boSuuTap);
    boSuuTap.save((err, data) => {
        if (err) {
            return next(err);
        }
        res.json(data);
    });
});
//#endregion

router.post("/chinhsuabst", async (req, res) => {
    console.log(" Chinh sua BST");
    //console.log("req.body.anhBia  " + req.body.anhBia);
    //var imgName = req.body.anhBia.slice(12);
    //console.log(req.body.maBaiViet);
    await BoSuuTap.findOneAndUpdate(
        { _id: req.body._id },
        {
            maBST: req.body.maBST,
            url: req.body.url,
            alt: req.body.alt,
            //src: "uploads/cntt/" + imgName,
        }
    );
    res.json({
        message: "Chỉnh sửa thành công",
    });
});
// Get All Tintuc
router.get("/danhsachbst", (req, res) => {
    BoSuuTap.find((error, data) => {
        if (error) {
            return res.json({
                message: "Lấy danh sách BST thành công.",
                data: [],
                error: error,
            });
        }
        res.json({ message: "Lấy danh sách bst thành công.", data: data });
    });
});
// add Tintuc add
router.post("/xoabst", async (req, res) => {
    console.log(" Xoa bai viet");
    console.log(req.body._id);
    await BoSuuTap.findOneAndUpdate(
        { _id: req.body._id },
        {
            trangThai: 0,
        }
    );
    res.json({
        message: " Xóa BST thành công",
    });
});

module.exports = router;
