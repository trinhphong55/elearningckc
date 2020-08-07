const router = require('express').Router();
const UserDAO = require('../DAO/UserDAO');
const md5 = require('md5');

const userDAO = new UserDAO();

router.post('/login', async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let result = await userDAO.login(email, password);
  let data = {};
  if(result != false){
    data = {
      'msg': 'Đăng nhập thành công',
      'data': result,
    };
  }
  else {
    data = {
      'msg': 'Sai tài khoản hoặc mật khẩu',
      'data': null,
    };
  }
  res.send(data);
})

router.post("/reset-password", async (req, res) => {
  const email = req.body.email;
  let result = await userDAO.resetPassword(email);
  let data = {};
  if(result != false){
    data = {
      'msg': 'Đã gửi mật khẩu về địa chỉ email',
      'status': true
    };
  }
  else {
    data = {
      'msg': 'Email không tồn tại',
      'status': false
    };
  }
  console.log('result', result);
  res.send(data);
})

module.exports = router;
