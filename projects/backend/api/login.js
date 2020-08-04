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
      'msg': 'Đăng nhập thất bại',
      'data': '',
    };
  }
  res.send(data);
})

module.exports = router;
