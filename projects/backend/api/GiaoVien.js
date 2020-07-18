const router = require('express').Router();
const GiaoVienDAO = require('../DAO/GiaoVienDAO');
const md5 = require('md5');

const giaoVienDAO = new GiaoVienDAO();
router.post('/them-giao-vien', async (req, res) =>{
    req.body.matKhauBanDau = md5(req.body.matKhauBanDau);
    let result = await giaoVienDAO.updateOrInsertOne({maGiaoVien: req.body.maGiaoVien}, req.body)
    res.send(result);
})

router.post('/xoa-giao-vien', async (req, res) =>{
  console.log('xoa-giao-vien');
  console.log('body', req.body);
})

router.get('/danh-sach-giao-vien', async (req, res) => {
    let result = await giaoVienDAO.layDanhSachGiaoVien();
    res.send(result);
})

router.get('/thong-tin-giao-vien/:id', async (req, res) => {
    let result = await giaoVienDAO.layThongTinGiaoVien(req.params.id);
    res.send(result);
})

router.get('/lay-ma-gv-moi-nhat', async (req, res) => {
  let result = await giaoVienDAO.layMaGVMoiNhat();
  res.send(result);
})
module.exports = router;
