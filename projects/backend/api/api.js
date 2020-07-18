const router = require("express").Router();
const LopHocPhanRoutes = require("./LopHocPhan");
const khoabomonController = require("../api/khoabomon");
const loaidonviController = require("../api/loaidonvi");
//
router.use("/lophocphan", LopHocPhanRoutes);

//Route KhoaBoMon
router.get("/khoabomon", khoabomonController.getKhoaBonMon);

router.post("/khoabomon", khoabomonController.postKhoaBoMon);

router.delete("/khoabomon/:id", khoabomonController.deleteKhoaBoMon);

router.put("/khoabomon/:id", khoabomonController.updateKhoaBoMon);

//Routes LoaiDonVi
router.get("/loaidonvi", loaidonviController.getLoaiDonVi);

module.exports = router;
