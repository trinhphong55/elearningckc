const router = require("express").Router();
const GiaoVienRoutes = require("./GiaoVien");
<<<<<<< HEAD
const MonHoc = require("./MonHoc");
const ChuongTrinhDaoTao = require("./ChuongTrinhDaoTao");
=======
>>>>>>> 48e1195e2d5a2376092bcac7947d3ffed6ea278e
const KeHoachDaoTao = require("./KeHoachDaoTao");
const LoaiHinhDaoTao = require("./LoaiHinhDaoTao");
const LopHocPhan = require("./LopHocPhan");
const LoaiMonHoc = require("./LoaiMonHoc");
<<<<<<< HEAD
const groupFB = require("../api/groupFB");
const sinhVien = require("./sinh-vien");
const Diemsinhvien= require("./diemsinhvien");
const SinhVien = require("./sinh-vien");

router.use("/loaimonhoc", LoaiMonHoc);
// router.use("/lophocphan", LopHocPhanRoutes);
=======
const sinhVien = require("./sinh-vien");
const Diemsinhvien= require("./diemsinhvien");
const MonHoc = require('./MonHoc');
const ChuongTrinhDaoTao = require('./ChuongTrinhDaoTao');
const GiaoVienLopHocPhan = require('./GiaoVienLopHocPhan');

router.use("/loaimonhoc", LoaiMonHoc);
>>>>>>> 48e1195e2d5a2376092bcac7947d3ffed6ea278e
router.use("/giaovien", GiaoVienRoutes);
router.use("/monhoc", MonHoc);
router.use("/ctdt", ChuongTrinhDaoTao);
router.use("/khdt", KeHoachDaoTao);
router.use("/lhdt", LoaiHinhDaoTao);
<<<<<<< HEAD
router.use("./lophocphan", LopHocPhan);
=======
router.use("/lophocphan", LopHocPhan);
router.use('/gvlhp', GiaoVienLopHocPhan);
>>>>>>> 48e1195e2d5a2376092bcac7947d3ffed6ea278e

const boMon = require("../api/bomon");
const khoabomonController = require("../api/khoabomon");
const loaidonviController = require("../api/loaidonvi");
const LopHoc = require("../api/LopHoc");
//
const validate = khoabomonController.checkValidate();

//nganhnghe bac
const NganhNgheRoutes = require("./NganhNghe");
const BacRoutes = require("./Bac");
<<<<<<< HEAD
const diemsinhvienModel = require("../models/diemsinhvien.model");
=======
>>>>>>> 48e1195e2d5a2376092bcac7947d3ffed6ea278e
//nganhnghe
router.use("/", NganhNgheRoutes);
//bac
router.use("/", BacRoutes);

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
router.get("/diemsinhvien/:maSinhVien/search",Diemsinhvien.getDiemsinhvien);


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
router.get("/lophoc/:maNganh/search", LopHoc.getAllFor);
router.get("/lophoc/:khoa/searchkhoa",LopHoc.getAllForkhoa);
router.get("/lophoc/:maNganh/searchnganh",LopHoc.getAllForManghanh);
<<<<<<< HEAD
router.get("/lophoc/mabac/:maBac",LopHoc.timLopTheoMaBac);//trinh phong them
=======
>>>>>>> 48e1195e2d5a2376092bcac7947d3ffed6ea278e

//Thêm dữ liệu vào KhoaBoMon
router.post("/lophoc", LopHoc.checkValidate(), LopHoc.insert);
//Xóa KhoaBoMon theo :id truyền vào
router.delete("/lophoc/:id", LopHoc.delete);
router.delete("/lophoc", LopHoc.removeAll);
router.delete("/lophoc/:maNganh/search", LopHoc.deleteMaNganh);
//Cập nhật KHoaBoMon theo :id và data truyền vào ( lư ý data ở request.body)
router.put("/lophoc/:id", LopHoc.checkValidate(), LopHoc.update);
router.post("/lophoc/:maNganh/xoa", LopHoc.timLopTheoTienTo);
<<<<<<< HEAD

=======
router.get("/lophoc/:tienTo/tiento", LopHoc.timLopTheoTienTo);


>>>>>>> 48e1195e2d5a2376092bcac7947d3ffed6ea278e
//-----------------------------Routes LoaiDonVi
router.get("/loaidonvi", loaidonviController.getLoaiDonVi);
//-----------------------------Routes groupFB
router.get("/groupfb", groupFB.getAll);

//----------------------------Routes SinhVien------------
router.get("/sinhvien", sinhVien.layTatCaSinhVien);
<<<<<<< HEAD
router.get("/sinhvien/malop/:maLopHoc",sinhVien.Laysinhvientheomalop);
=======
router.get("/sinhvien/:maLopHoc/malop",sinhVien.Laysinhvientheomalop);
>>>>>>> 48e1195e2d5a2376092bcac7947d3ffed6ea278e
router.post("/sinhvien", sinhVien.themSinhVien);
router.get("/sinhvien/:maSV", sinhVien.layThongtinSinhVien);
router.put("/sinhvien", sinhVien.capNhatSinhVien);
router.delete('/sinhvien',sinhVien.removeAll);
router.get("/sinhvien/:maLopHoc/siso",sinhVien.tinhTongSinhVien);



<<<<<<< HEAD
=======


>>>>>>> 48e1195e2d5a2376092bcac7947d3ffed6ea278e
module.exports = router;
