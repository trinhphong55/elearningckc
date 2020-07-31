const router = require("express").Router();
const LopHocPhanRoutes = require("./LopHocPhan");
const GiaoVienRoutes = require("./GiaoVien");
const cnttTinTucRoute = require("./cnttTinTuc");
const cnttCrawlingRoutes = require("./cnttCrawling");
const ttthTinTucRoute = require("./ttthTintuc");
const ttthBannerRoute = require("./ttthBanner");
const ttthTTWRoute = require("./ttthThongTinWeb");
const ttthCamOnRoute = require("./ttthCamOn");
const ttthTienIchRoute = require("./ttthTienIch");
const cnttLoaiBaiVietRoutes = require("./cnttLoaiBaiViet");
const cnttSlideShowRoutes = require("./cnttSlideShow");
const cnttTrangChu = require("./cnttTrangChu");
const cnttTienIchSinhVien = require("./cnttTienIchSinhVien")
const cnttDanhMuc = require("./cnttDanhMuc");

router.use("/lophocphan", LopHocPhanRoutes);
router.use("/giaovien", GiaoVienRoutes);
//cnttRoute
router.use("/slideshow", cnttSlideShowRoutes);
router.use("/cnttTinTuc", cnttTinTucRoute);
router.use("/crawling", cnttCrawlingRoutes);
router.use("/loaibaiviet", cnttLoaiBaiVietRoutes);
router.use("/cntt", cnttTrangChu);
router.use("/cnttTienIchSinhVien", cnttTienIchSinhVien);
router.use("/danhmuc", cnttDanhMuc);
//end cntt
//ttthRoutes
router.use("/ttthTinTuc", ttthTinTucRoute);
router.use("/ttthBanner", ttthBannerRoute);
router.use("/ttthThongTinWeb", ttthTTWRoute);
router.use("/ttthCamOn", ttthCamOnRoute);
router.use("/ttthTienIch", ttthTienIchRoute);
//ttth
const khoabomonController = require("../api/khoabomon");
const loaidonviController = require("../api/loaidonvi");
//

//Route KhoaBoMon
router.get("/khoabomon", khoabomonController.getKhoaBonMon);

router.post("/khoabomon", khoabomonController.postKhoaBoMon);

router.delete("/khoabomon/:id", khoabomonController.deleteKhoaBoMon);

router.put("/khoabomon/:id", khoabomonController.updateKhoaBoMon);

//Routes LoaiDonVi
router.get("/loaidonvi", loaidonviController.getLoaiDonVi);

module.exports = router;
