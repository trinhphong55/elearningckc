const router = require("express").Router();
const GiaoVienRoutes = require("./GiaoVien");
const MonHoc = require("./MonHoc");
const ChuongTrinhDaoTao = require("./ChuongTrinhDaoTao");
const KeHoachDaoTao = require("./KeHoachDaoTao");
const LoaiHinhDaoTao = require("./LoaiHinhDaoTao");
const LopHocPhan = require("./LopHocPhan");
const LoaiMonHoc = require("./LoaiMonHoc");
const groupFB = require("../api/groupFB");
const boMon = require("../api/bomon");
const auth = require("./auth");

const sinhVien = require("./sinh-vien");
const Diemsinhvien = require("./diemsinhvien");
const GiaoVienLopHocPhan = require("./GiaoVienLopHocPhan");
const cotDiemLHP = require("./cotdiem-lophocphan");
const cnttTinTucRoute = require("./cnttTinTuc");
const cnttCrawlingRoutes = require("./cnttCrawling");
const ttthTinTucRoute = require("./ttthTintuc");
const ttthBannerRoute = require("./ttthBanner");
const ttthTTWRoute = require("./ttthThongTinWeb");
const ttthCamOnRoute = require("./ttthCamOn");
const ttthTienIchRoute = require("./ttthTienIch");
const ttthKhoaHocRoute = require("./ttthKhoaHoc");
const cnttLoaiBaiVietRoutes = require("./cnttLoaiBaiViet");
const cnttSlideShowRoutes = require("./cnttSlideShow");
const cnttTrangChu = require("./cnttTrangChu");
const cnttTienIchSinhVien = require("./cnttTienIchSinhVien");
const cnttDanhMuc = require("./cnttDanhMuc");
const cnttBoSuuTap = require("./cnttBoSuuTap");
const cnttThongTinChung = require("./cnttThongTinChung");

router.use("/loaimonhoc", LoaiMonHoc);
// router.use("/lophocphan", LopHocPhanRoutes);
router.use("/giaovien", GiaoVienRoutes);
router.use("/monhoc", MonHoc);
router.use("/ctdt", ChuongTrinhDaoTao);
router.use("/khdt", KeHoachDaoTao);
router.use("/lhdt", LoaiHinhDaoTao);
router.use("/lophocphan", LopHocPhan);
router.use("/gvlhp", GiaoVienLopHocPhan);
//cnttRoute
router.use("/slideshow", cnttSlideShowRoutes);
router.use("/cnttTinTuc", cnttTinTucRoute);
router.use("/crawling", cnttCrawlingRoutes);
router.use("/loaibaiviet", cnttLoaiBaiVietRoutes);
router.use("/cntt", cnttTrangChu);
router.use("/cnttTienIchSinhVien", cnttTienIchSinhVien);
router.use("/danhmuc", cnttDanhMuc);
router.use("/cnttbosuutap", cnttBoSuuTap);
router.use("/thongtinchung", cnttThongTinChung);
//end cntt
//ttthRoutes
router.use("/ttthTinTuc", ttthTinTucRoute);
router.use("/ttthBanner", ttthBannerRoute);
router.use("/ttthThongTinWeb", ttthTTWRoute);
router.use("/ttthCamOn", ttthCamOnRoute);
router.use("/ttthTienIch", ttthTienIchRoute);
router.use("/ttthKhoaHoc", ttthKhoaHocRoute);
//ttth
const khoabomonController = require("../api/khoabomon");
const loaidonviController = require("../api/loaidonvi");
const LopHoc = require("../api/LopHoc");
//
const validate = khoabomonController.checkValidate();

//nganhnghe bac
const NganhNgheRoutes = require("./NganhNghe");
const BacRoutes = require("./Bac");
const diemsinhvienModel = require("../models/diemsinhvien.model");
//nganhnghe
router.use("/", NganhNgheRoutes);
//bac
router.use("/", BacRoutes);
//login
router.use("/", auth);

//-------------------------------Route KhoaBoMonn
//Lấy toàn bộ dữ liệu từ KhoaBoMon
router.get("/khoabomon", khoabomonController.getKhoaBonMon);
router.get("/khoabomon/:id", khoabomonController.getOneKhoaBoMon);
//Thêm dữ liệu vào KhoaBoMon
router.post("/khoabomon", validate, khoabomonController.postKhoaBoMon);
//Xóa KhoaBoMon theo :id truyền vào
router.delete("/khoabomon/:id", khoabomonController.deleteKhoaBoMon);
//Cập nhật KHoaBoMon theo :id và data truyền vào ( lư ý data ở request.body)
router.put("/khoabomon/:id", validate, khoabomonController.updateKhoaBoMon);

//lấy danh sách môn học phần của sinh viên theo môn truyền vào
router.get("/diemsinhvien/:maSinhVien/search", Diemsinhvien.getDiemsinhvien);

//Lấy toàn bộ dữ liệu từ KhoaBoMon
router.get("/bomon", boMon.getKhoaBonMon);
router.get("/bomon/:id", boMon.getOneKhoaBoMon);
//Thêm dữ liệu vào KhoaBoMon
router.post("/bomon", boMon.checkValidate(), boMon.postKhoaBoMon);
//Xóa KhoaBoMon theo :id truyền vào
router.delete("/bomon/:id", boMon.deleteKhoaBoMon);
//Cập nhật KHoaBoMon theo :id và data truyền vào ( lư ý data ở request.body)
router.put("/bomon/:id", boMon.checkValidate(), boMon.updateKhoaBoMon);

//---------------------------Routes LopHoc--------------------------
//Lấy toàn bộ dữ liệu từ KhoaBoMon
router.get("/lophoc", LopHoc.getAll);
router.get("/lophoc/:id", LopHoc.getOne);
router.get("/lophoc/:khoa/searchkhoa", LopHoc.getAllForkhoa);
router.get("/lophoc/:maNganh/searchnganh", LopHoc.getAllForManghanh);
router.get("/lophoc/mabac/:maBac", LopHoc.timLopTheoMaBac); //trinh phong them

//Thêm dữ liệu vào KhoaBoMon
router.post("/lophoc", LopHoc.checkValidate(), LopHoc.insert);
//Xóa KhoaBoMon theo :id truyền vào
router.delete("/lophoc/:id", LopHoc.delete);
router.delete("/lophoc", LopHoc.removeAll);
router.delete("/lophoc/:tienTo/tiento", LopHoc.deleteTheoTienTo);
//Cập nhật KHoaBoMon theo :id và data truyền vào ( lư ý data ở request.body)
router.put("/lophoc/:id", LopHoc.checkValidate(), LopHoc.update);
router.put("/lophoc/:maLop/facebook", LopHoc.capNhatThongTinFaceBook);

router.get("/lophoc/:tienTo/tiento", LopHoc.timLopTheoTienTo);

//-----------------------------Routes LoaiDonVi
router.get("/loaidonvi", loaidonviController.getLoaiDonVi);
//-----------------------------Routes groupFB
router.get("/groupfb", groupFB.getAll);

//----------------------------Routes SinhVien------------
router.get("/sinhvien", sinhVien.layTatCaSinhVien);
router.get("/sinhvien/:maLopHoc/malop", sinhVien.Laysinhvientheomalop);
router.post("/sinhvien", sinhVien.themSinhVien);
router.get("/sinhvien/:maSV", sinhVien.layThongtinSinhVien);
router.put("/sinhvien", sinhVien.capNhatSinhVien);
router.delete("/sinhvien", sinhVien.removeAll);
router.get("/sinhvien/:maLopHoc/siso", sinhVien.tinhTongSinhVien);

//========================= Routes CotDiemLopHocPhan ===================================
router.get("/cotdiemlhp", cotDiemLHP.layDiemLHP);
module.exports = router;
