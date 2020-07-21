const router = require('express').Router()
const LopHocPhanRoutes = require('./LopHocPhan')
const GiaoVienRoutes = require('./GiaoVien')

router.use('/lophocphan', LopHocPhanRoutes)
router.use('/giaovien', GiaoVienRoutes)

const khoabomonController = require("../api/khoabomon");
const loaidonviController = require("../api/loaidonvi");
//
//nganhnghe bac
const NganhNgheRoutes = require('./NganhNghe')
const BacRoutes = require('./Bac')
//nganhnghe
router.use('/', NganhNgheRoutes)
//bac
router.use('/', BacRoutes)
//Route KhoaBoMon
router.get("/khoabomon", khoabomonController.getKhoaBonMon);

router.post("/khoabomon", khoabomonController.postKhoaBoMon);

router.delete("/khoabomon/:id", khoabomonController.deleteKhoaBoMon);

router.put("/khoabomon/:id", khoabomonController.updateKhoaBoMon);

//Routes LoaiDonVi
router.get("/loaidonvi", loaidonviController.getLoaiDonVi);

module.exports = router;
