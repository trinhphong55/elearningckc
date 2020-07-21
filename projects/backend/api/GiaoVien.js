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
  let result = await giaoVienDAO.updateOrInsertOne({maGiaoVien: req.body.maGiaoVien}, {trangThai: 0})
  res.send(result);
})

router.get('/danh-sach-giao-vien', async (req, res) => {
  let result = await giaoVienDAO.layDanhSachGiaoVien();
  res.send(result);
})

router.post('/thong-tin-giao-vien', async (req, res) => {
  let result = await giaoVienDAO.layThongTinGiaoVien(req.body.maGiaoVien);
  // console.log('result', result);
  res.send(result);
})

router.post('/cap-nhat-giao-vien', async (req, res) => {
  let result = await giaoVienDAO.updateOrInsertOne({maGiaoVien: req.body.maGiaoVien}, req.body)
  res.send(result);
})

router.get('/lay-ma-gv-moi-nhat', async (req, res) => {
  let result = await giaoVienDAO.layMaGVMoiNhat();
  res.send(result);
})

router.post('/them-giao-vien-excel', async (req, res) => {
  console.log('route', req.body);
  let result = await giaoVienDAO.importExcel(req.body);
  if(result != false){
    res.send({'msg': 'Import thành công'});
  }
  else{
    res.send({'msg': 'Dữ liệu giáo viên trong excel đã tồn tại'});
  }
})
module.exports = router;
