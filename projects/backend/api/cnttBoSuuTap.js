const router = require("express").Router();
const path = require("path");
const BoSuuTap = require("../models/cnttBoSuuTap.model");
const multer = require("multer");

const FILE_PATH = "uploads/cntt/";

// define multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILE_PATH);
    },
    filename: (req, file, cb) => {
        const filename =
            file.fieldname + "_" + Date.now() + path.extname(file.originalname);
        cb(null, filename);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        files: 10, // allow up to 10 files per request
        fieldSize: 5 * 1024 * 1024, // 5MB (max file size)
    },
    fileFilter: (req, file, cb) => {
        // allow images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error("Only image are allowed."), false);
        }
        cb(null, true);
    },
});

//#endregion
function uploadPhotos(req, res, next) {
    upload.single("image")(req, res, function (error) {
        try {
            console.log("run uploadPhotos");
            const photos = req.file;
            console.log(photos);
            console.log(req.file);
            // check if photos are available
            if (!photos) {
                res.status(400).json({
                    status: false,
                    message: "No photo is selected.",
                });
            } else {
                req.body.uploads = photos;
                next();
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });
}
//#endregion

async function saveInformationsSlideShowToDatabase(req, res) {
    try {
        console.log("run save infomartion");
        console.log(req.body);
        console.log(req.body)
        var boSuuTap = new BoSuuTap({
            maBST: req.body.maBST,
            url: req.body.url,
            alt: req.body.alt,
            src: "uploads/cntt/" + req.body.uploads.originalname,
            trangThai: 1
        });
        console.log(boSuuTap);
        boSuuTap.save((err, data) => {
            if (err) {
                return next(err);
            }
            res.json(data);
        });
    } catch (error) {
        res.json({ message: "Thêm thất bại", error: error });
    }
}

router.post("/taobst", uploadPhotos, saveInformationsSlideShowToDatabase);

router.post("/chinhsuabst", async (req, res) => {
    console.log(" Chinh sua BST");
    console.log("req.body.src  " + req.body.src);
    var imgName = req.body.src.slice(12);
    await BoSuuTap.findOneAndUpdate(
        { _id: req.body._id },
        {
            maBST: req.body.maBST,
            url: req.body.url,
            alt: req.body.alt,
            src: "uploads/cntt/" + imgName,
            trangThai: 1
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
router.get("/danhsachlienketcntt", (req, res) => {
    BoSuuTap.find({ maBST: "BST01", trangThai: 1 }, (error, data) => {
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
router.get("/danhsachslidercntt", (req, res) => {
    BoSuuTap.find({ maBST: "BST02", trangThai: 1 }, (error, data) => {
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
    console.log(" Xoa item bst");
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
