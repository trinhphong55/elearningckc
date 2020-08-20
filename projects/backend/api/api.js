const router = require("express").Router();

module.exports = function (io) {
  const verifyToken = require("../middleware/accountAuth");
  const GiaoVienRoutes = require("./GiaoVien");
  const MonHoc = require("./MonHoc");
  const ChuongTrinhDaoTao = require("./ChuongTrinhDaoTao");
  const KeHoachDaoTao = require("./KeHoachDaoTao");
  const LoaiHinhDaoTao = require("./LoaiHinhDaoTao");
  const LopHocPhan = require("./LopHocPhan");
  const LoaiMonHoc = require("./LoaiMonHoc");
  const groupFB = require("../api/groupFB");
  const pagefb = require("../api/pagefb");
  const baidangfb = require("../api/baidangfb");
  const trangthaifb = require("../api/trangthaifb");
  const loaifb = require("../api/loaifb");
  const boMon = require("../api/bomon");
  const cnttHeader = require("./cnttHeader");
  const auth = require("./auth");
  const TKB = require("./TKB");
  const BaiTap = require("./BaiTap");
  const BaiTapSinhVien = require("./BaiTapSinhVien");
  const activity = require("./activity");
  const PhongHoc = require("./PhongHoc");
  const LichPhongHoc = require("./LichPhongHoc");
  const Template = require("./Template");
  const sinhVien = require("./sinh-vien");
  const Diemsinhvien = require("./diemsinhvien");
  const GiaoVienLopHocPhan = require("./GiaoVienLopHocPhan");
  const cotDiemLHP = require("./cotdiem-lophocphan");
  // const cnttTinTucRoute = require("./cnttTinTuc")(io);
  const cnttCrawlingRoutes = require("./cnttCrawling");
  const ttthTinTucRoute = require("./ttthTintuc");
  const ttthBannerRoute = require("./ttthBanner");
  const ttthTTWRoute = require("./ttthThongTinWeb");
  const ttthCamOnRoute = require("./ttthCamOn");
  const ttthTienIchRoute = require("./ttthTienIch");
  const ttthKhoaHocRoute = require("./ttthKhoaHoc");
  const ttthLopHocRoute = require("./ttthLopHoc");
  const ttthDangKiKhoaHocRoute = require("./ttthDangKiKhoaHoc");
  const ttthLienHeRoute = require("./ttthLienHe");
  const ttthDotThiRoute = require("./ttthDotThi");
  const ttthDangKiDotThiRoute = require("./ttthDangKiDotThi");
  const ttthDiemThiRoute = require("./ttthDiemThi");
  const cnttLoaiBaiVietRoutes = require("./cnttLoaiBaiViet");
  const cnttSlideShowRoutes = require("./cnttSlideShow");
  const cnttTrangChu = require("./cnttTrangChu");
  const cnttTienIchSinhVien = require("./cnttTienIchSinhVien");
  const cnttDanhMuc = require("./cnttDanhMuc");
  const cnttBoSuuTap = require("./cnttBoSuuTap");
  const cnttThongTinChung = require("./cnttThongTinChung");
  const cnttFooter = require("./cnttFooter");
  const ttthChuDeRoutes = require("./ttthChuDe");

  const ctDiemLopHP = require("./ct-diemsv-lhp");
  const ChuDe = require("./chu-de");
  const baiGiang = require("./bai-giang");
  const binhLuan = require("./binh-luan");

  router.use("/loaimonhoc", LoaiMonHoc);
  // router.use("/lophocphan", LopHocPhanRoutes);
  router.use("/giaovien", GiaoVienRoutes);
  router.use("/monhoc", verifyToken, MonHoc);
  router.use("/ctdt", ChuongTrinhDaoTao);
  router.use("/khdt", KeHoachDaoTao);
  router.use("/lhdt", LoaiHinhDaoTao);
  router.use("/lophocphan", LopHocPhan);
  router.use("/gvlhp", GiaoVienLopHocPhan);
  router.use("/tkb", TKB);
  router.use("/phonghoc", PhongHoc);
  router.use("/lichphonghoc", LichPhongHoc);
  router.use("/template", Template);

  //Elearning routes
  router.use("/baitap", BaiTap);
  router.use("/baitapSinhVien", BaiTapSinhVien);
  router.use("/activity", activity);
  //cnttRoute
  router.use("/slideshow", cnttSlideShowRoutes);
  router.use("/cnttTinTuc", require("./cnttTinTuc")(io));
  router.use("/crawling", cnttCrawlingRoutes);
  router.use("/loaibaiviet", cnttLoaiBaiVietRoutes);
  router.use("/cntt", cnttTrangChu);
  router.use("/cnttTienIchSinhVien", cnttTienIchSinhVien);
  router.use("/danhmuc", cnttDanhMuc);
  router.use("/cnttbosuutap", cnttBoSuuTap);
  router.use("/thongtinchung", cnttThongTinChung);
  router.use("/cnttHeader", cnttHeader);
  router.use("/cnttHeader", cnttHeader);
  router.use("/cnttFooter", cnttFooter);
  //end cntt
  //ttthRoutes
  router.use("/ttthTinTuc", ttthTinTucRoute);
  router.use("/ttthBanner", ttthBannerRoute);
  router.use("/ttthThongTinWeb", ttthTTWRoute);
  router.use("/ttthCamOn", ttthCamOnRoute);
  router.use("/ttthTienIch", ttthTienIchRoute);
  router.use("/ttthKhoaHoc", ttthKhoaHocRoute);
  router.use("/ttthLopHoc", ttthLopHocRoute);
  router.use("/ttthDangKiKhoaHoc", ttthDangKiKhoaHocRoute);
  router.use("/ttthLienHe", ttthLienHeRoute);
  router.use("/ttthDotThi", ttthDotThiRoute);
  router.use("/ttthDangKiDotThi", ttthDangKiDotThiRoute);
  router.use("/ttthDiemThi", ttthDiemThiRoute);
  router.use("/ttth/chude", ttthChuDeRoutes);
  //ttth
  const khoabomonController = require("../api/khoabomon");
  const loaidonviController = require("../api/loaidonvi");
  const LopHoc = require("../api/LopHoc");
  const LopHocDAO = require("../DAO/LopHocDAO");
  const lopHocDAO = new LopHocDAO();
  //
  const validate = khoabomonController.checkValidate();

  //nganhnghe bac
  const NganhNgheRoutes = require("./NganhNghe");
  const BacRoutes = require("./Bac");
  //nganhnghe
  router.use("/", NganhNgheRoutes);
  //bac
  router.use("/", BacRoutes);
  //login
  router.use("/", auth);

  //-------------------------------Route KhoaBoMonn
  //Lấy toàn bộ dữ liệu từ KhoaBoMon
  router.get("/khoabomon", verifyToken, khoabomonController.getKhoaBonMon);
  router.get(
    "/khoabomon/:id",
    verifyToken,
    khoabomonController.getOneKhoaBoMon
  );
  //Thêm dữ liệu vào KhoaBoMon
  router.post("/khoabomon", validate, khoabomonController.postKhoaBoMon);
  //Xóa KhoaBoMon theo :id truyền vào
  router.delete(
    "/khoabomon/:id",
    verifyToken,
    khoabomonController.deleteKhoaBoMon
  );
  //Cập nhật KHoaBoMon theo :id và data truyền vào ( lư ý data ở request.body)
  router.put(
    "/khoabomon/:id",
    verifyToken,
    validate,
    khoabomonController.updateKhoaBoMon
  );

  //lấy danh sách môn học phần của sinh viên theo môn truyền vào
  router.get(
    "/diemsinhvien/:maSinhVien/search",
    verifyToken,
    Diemsinhvien.getDiemsinhvien
  );
  router.get(
    "/diemsinhvien/:maSinhVien/khdt",
    verifyToken,
    Diemsinhvien.getDiemSinhVien_maSSV
  );
  router.get(
    "/diemsinhvien/:maLopHocPhan/laytongdiem",
    verifyToken,
    Diemsinhvien.LayTONGDIEM
  );

  //Lấy toàn bộ dữ liệu từ KhoaBoMon
  router.get("/bomon", verifyToken, boMon.getKhoaBonMon);
  router.get("/bomon/:id", verifyToken, boMon.getOneKhoaBoMon);
  //Thêm dữ liệu vào KhoaBoMon
  router.post(
    "/bomon",
    verifyToken,
    boMon.checkValidate(),
    boMon.postKhoaBoMon
  );
  //Xóa KhoaBoMon theo :id truyền vào
  router.delete("/bomon/:id", verifyToken, boMon.deleteKhoaBoMon);
  //Cập nhật KHoaBoMon theo :id và data truyền vào ( lư ý data ở request.body)
  router.put(
    "/bomon/:id",
    verifyToken,
    boMon.checkValidate(),
    boMon.updateKhoaBoMon
  );

  //---------------------------Routes LopHoc--------------------------
  router.post("/thongKeLopTheoNganhCuaNam", async (req, res) => {
    const nam = req.body.nam;
    let result = false;
    result = await lopHocDAO.layDanhSachLopHocTheoTungNganhCuaNam(nam);
    if (result != false) {
      data = {
        msg: "Lấy danh sách thống kê thành công",
        data: result,
      };
    } else {
      data = {
        msg: "Lấy danh sách thống kê thất bại",
        data: null,
      };
    }
    res.send(data);
  });
  //Lấy toàn bộ dữ liệu từ KhoaBoMon
  router.get("/lophoc", verifyToken, LopHoc.getAll);
  router.get("/lophoc/:id", verifyToken, LopHoc.getOne);
  router.get("/lophoc/:khoa/searchkhoa", verifyToken, LopHoc.getAllForkhoa);
  router.get(
    "/lophoc/:maNganh/searchnganh",
    verifyToken,
    LopHoc.getAllForManghanh
  );
  router.get("/lophoc/mabac/:maBac", verifyToken, LopHoc.timLopTheoMaBac); //trinh phong them
  router.get("/lophoc/mactdt/:maCTDT", verifyToken, LopHoc.getDSLopHocbymaCTDT); // verifyToken, Yasuo fam 100 con linh trong 10 phut

  //Thêm dữ liệu vào KhoaBoMon
  router.post("/lophoc", verifyToken, LopHoc.checkValidate(), LopHoc.insert);
  //Xóa KhoaBoMon theo :id truyền vào
  router.delete("/lophoc/:id", verifyToken, LopHoc.delete);
  router.delete("/lophoc", verifyToken, LopHoc.removeAll);
  router.delete("/lophoc/:tienTo/tiento", verifyToken, LopHoc.deleteTheoTienTo);
  //Cập nhật KHoaBoMon theo :id và data truyền vào ( lư ý data ở request.body)
  router.put("/lophoc/:id", LopHoc.checkValidate(), LopHoc.update);
  router.put("/lophoc/:maLop/facebook", LopHoc.capNhatThongTinFaceBook);
  router.get("/lophoc/:tienTo/tiento", verifyToken, LopHoc.timLopTheoTienTo);

  //-----------------------------Routes LoaiDonVi
  router.get("/loaidonvi", loaidonviController.getLoaiDonVi);
  //-----------------------------Routes FB--------------------------------------------
  router.get("/groupfb", groupFB.getAll);
  //Lấy tất cả từ PageFB
  router.get("/pagefb", pagefb.getAll);
  //Thêm 1 page vào PageFB
  router.post("/pagefb", pagefb.postPageFB);
  //Update 1 page trong PageFB
  router.put("/pagefb/:id", pagefb.updatePageFB);
  //Delete 1 page trong PageFB
  router.delete("/pagefb/:id", pagefb.deletePageFB);
  //Lấy tất cả từ db QlBaiDangFB
  router.get("/baidangfb", baidangfb.getAll);
  //Thêm vào draw
  router.post("/baidangfb", baidangfb.postToDrawFB);
  //Thêm vào posted
  router.post("/baidangfb/all", baidangfb.postedToFB);
  //Update posted
  router.put("/baidangfb/:postID", baidangfb.updatePostedFB);
  //Update draw
  router.put("/baidangfbraw/:id", baidangfb.updateDrawFB);
  //Xóa bài post
  router.delete("/baidangfb/:postID", baidangfb.deletePostFB);
  //Xóa bản lưu nháp
  router.delete("/baidangfbraw/:id", baidangfb.deleteDrawFB);
  //Update từ draw sang posted
  router.put("/baidangfbv2/:id", baidangfb.updateDrawToPosted);
  //Get mọi thứ trong Trạng thái
  router.get("/trangthaifb", trangthaifb.getAll);
  //Get mọi thứ trong Loại FB
  router.get("/loaifb", loaifb.getAll);

  //----------------------------Routes SinhVien------------
  router.get("/sinhvien", verifyToken, sinhVien.layTatCaSinhVien);
  router.get(
    "/sinhvien/:maLopHoc/malop",
    verifyToken,
    sinhVien.Laysinhvientheomalop
  );
  router.post("/sinhvien", verifyToken, sinhVien.themSinhVien);
  router.get("/sinhvien/:maSV", verifyToken, sinhVien.layThongtinSinhVien);
  router.put("/sinhvien", verifyToken, sinhVien.capNhatSinhVien);
  router.delete("/sinhvien", verifyToken, sinhVien.removeAll);
  router.get(
    "/sinhvien/:maLopHoc/siso",
    verifyToken,
    sinhVien.tinhTongSinhVien
  );
  router.get(
    "/sinhvien/:maLopHoc/sisolhp",
    verifyToken,
    sinhVien.layDSLopHocPhan
  );
  router.get(
    "/sinhvien/:maLopHocPhan/lophocphan",
    verifyToken,
    sinhVien.laySinhVienLopHocPhan
  );

  //========================= Routes CotDiemLopHocPhan ===================================
  router.get("/cotdiemlhp", verifyToken, cotDiemLHP.layDiemLHP);
  router.get(
    "/cotdiemlhp/:maLopHocPhan",
    verifyToken,
    cotDiemLHP.layDiemLHPtheoMaLHP
  );
  router.get(
    "/cotdiemlhp/lophocphan/:maLopHocPhan",
    verifyToken,
    cotDiemLHP.layDiemLHPtheoMaLHP
  );
  router.get(
    "/cotdiemlophocphan/:maLopHocPhan",
    verifyToken,
    cotDiemLHP.layCotDiemTheoMaLopHp
  );
  router.post("/cotdiemlophocphan", verifyToken, cotDiemLHP.themCotDiem);
  router.put(
    "/suacotdiemlophocphan/:maCotDiem",
    verifyToken,
    cotDiemLHP.suaCotDiem
  );
  router.get(
    "/cotdiemlophocphan/:maCotDiem/chitiet",
    verifyToken,
    cotDiemLHP.layCotDiemTheoMaCotDiem
  );

  //========================= Routes CotDiemLopHocPhan ===================================
  router.get("/cotdiemlhp", verifyToken, cotDiemLHP.layDiemLHP);
  router.get(
    "/cotdiemlhp/:maLopHocPhan",
    verifyToken,
    cotDiemLHP.layDiemLHPtheoMaLHP
  );
  router.get(
    "/cotdiemlhp/lophocphan/:maLopHocPhan",
    verifyToken,
    cotDiemLHP.layDiemLHPtheoMaLHP
  );
  router.get(
    "/cotdiemlophocphan/:maLopHocPhan",
    verifyToken,
    cotDiemLHP.layCotDiemTheoMaLopHp
  );
  router.post("/cotdiemlophocphan", verifyToken, cotDiemLHP.themCotDiem);
  router.put(
    "/suacotdiemlophocphan/:maCotDiem",
    verifyToken,
    cotDiemLHP.suaCotDiem
  );
  router.get(
    "/cotdiemlophocphan/:maCotDiem/chitiet",
    verifyToken,
    cotDiemLHP.layCotDiemTheoMaCotDiem
  );

  //======================= Routes ChitietDiemSVLopHocPhan ==================================
  router.get(
    "/ct-diemsv-lophocphan/:masv",
    verifyToken,
    ctDiemLopHP.layCTDiemLopHPtheoMaSV
  );
  router.get(
    "/ct-diemsv-lophocphan/:maHocPhan/lophocphan",
    verifyToken,
    ctDiemLopHP.layCTDiemLopHPtheoMaLopHP
  );
  router.get(
    "/ct-diemsv-lophocphan/:maCotDiem/sinhvienlophocphan",
    verifyToken,
    ctDiemLopHP.dsChamDiemSinhVien
  );
  router.put(
    "/ct-diemsv-lophocphan/:id/chamdiem",
    verifyToken,
    ctDiemLopHP.chamdiemsinhvienlophocphan
  );
  router.get(
    "/ct-diemsv-lophocphan/:maCotDiem/exportexcel",
    verifyToken,
    ctDiemLopHP.thongTinXuatExcel
  );
  router.post(
    "/ct-diemsv-lophocphan/:maCotDiem/importexcel",
    verifyToken,
    ctDiemLopHP.thongTinNhapExcel
  );
  router.delete("/ct-diemsv-lophocphan", ctDiemLopHP.xoaDiem);
  //======================= Routes Diem tong ket ==================================
  router.post("/diemsinhvien/:maLopHocPhan", Diemsinhvien.luuTongDiem);
  router.delete("/diemsinhvien", verifyToken, Diemsinhvien.xoaDiem);

  //=========================== Routes ChuDe =============================================
  router.get("/chude", verifyToken, ChuDe.layTatCa);
  router.get("/chude/:maChuDe", verifyToken, ChuDe.layMot);
  router.get(
    "/chude/:maLopHocPhan/lop-hoc-phan",
    verifyToken,
    ChuDe.layTheo_MaLHP
  );
  router.post("/chude", verifyToken, ChuDe.them);
  router.delete("/chude/:maChuDe", verifyToken, ChuDe.xoaTheo_maChuDe);

  //=========================== Routes BaiGiang =============================================
  router.get("/baigiang", verifyToken, baiGiang.layTatCa);
  router.get("/baigiang/:maChuDe", baiGiang.layTheoMaChuDe);
  router.post("/baigiang", verifyToken, baiGiang.them);
  router.get(
    "/baigiang/:maLopHocPhan/lop-hoc-phan",
    verifyToken,
    baiGiang.layTheo_MaLHP
  );
  router.get(
    "/baigiang/:maBaiGiang/ma-bai-giang",
    verifyToken,
    baiGiang.layTheo_maBaiGiang
  );
  router.post("/baigiang/upload", baiGiang.upload);
  router.post("/baigiang/download", baiGiang.download);
  router.delete("/baigiang/:maBaiGiang", baiGiang.xoa);

  //========================= Routes BinhLuan ==========================================
  router.get(
    "/binhluan/:loaiBaiViet/baiviet/:maBaiViet",
    verifyToken,
    binhLuan.layBinhLuan_theoBaiViet
  );
  router.post("/binhluan", verifyToken, binhLuan.themBinhLuan);
  router.get("/binhluan", verifyToken, binhLuan.layTatCaBinhLuan);

  return router;
};
