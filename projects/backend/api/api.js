<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const LopHocPhanRoutes = require('./LopHocPhan');
const MonHoc = require('./MonHoc');

router.use('/', LopHocPhanRoutes);
router.use('/', MonHoc);

=======
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

>>>>>>> 6f1639fbea27453ce5e4f7784cd6f68b3ae8dc79
module.exports = router;
