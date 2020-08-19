const MongoDB = require('../MongoDB');
const md5 = require('md5');
const JWT = require('jsonwebtoken');
const { check } = require('express-validator');
const nodemailer = require('nodemailer');
const { token } = require('morgan');
const option = {
  service: 'gmail',
  auth: {
      user: '0306171413@caothang.edu.vn',
      pass: '301688325'
  }
};

var transporter = nodemailer.createTransport(option);

class UserDAO extends MongoDB{
  constructor(type) {
    super()
    this.collectionName = 'user';
  }

  async getUser(email, password) {
    const list = await this.find({
      email,
      password: md5(password),
      isValid: true
    });
    return list;
  }

  async getEmail(email){
    const list = await this.find({
      email,
      isValid: true
    });
    return list;
  }

  async getMaLopHoc(mssv){
    await this.connectDB();
    let result = await this.conDb.collection('SinhVien').find({maSinhVien: mssv}).toArray();
    await this.closeDB();
    return result;
  }

  async resetPassword(email){
    const checkUser = await this.getEmail(email);
    let token;
    if (checkUser && checkUser.length){
      const temp = parseInt(Math.random() * 10000);
      const obj = { id: email, temp};
      token = JWT.sign(obj, '22222');
      transporter.verify(function(error, success) {
        if (error) {
            console.log('error: ', error);
        } else {
            var mail = {
                from: '0306171413@caothang.edu.vn',
                to: email,
                subject: 'Link reset password',
                html: `<b> Xin chào </b>, <br/>
                Theo yêu cầu của bạn, chúng tôi gửi lại bạn thông tin mật mã tài khoản. <br/>
                <b>Password</b>: ${token.slice(160, 167)} </br>
                `
            };
            transporter.sendMail(mail, async function(error, info) {
                if (error) {
                  console.log('error: ', error);
                } else {
                  const userDAO = new UserDAO();
                  await userDAO.connectDB();
                  await userDAO.conDb.collection(userDAO.collectionName).updateOne({email: mail.to}, {$set: {"password": md5(token.slice(160, 167))}});
                  await userDAO.closeDB();
                  return true;
                }
            });
        }
    });
    }
    if(token) return true;
    return false;
  }

  async login(email, password) {
    const checkUser = await this.getUser(email, password);
    if (checkUser && checkUser.length) {
      const obj = { id: email, password };
      const token = JWT.sign(obj, '11111');
      const role = checkUser[0].role;
      const name = checkUser[0].displayName;
      return { token, role, email, name};
    }
    else {
      return false;
    }
  }

  async changePassword(mssv, oldPass, newPass, newPassConfirm){
    let result = false;
    const options = {
      email: `${mssv}@caothang.edu.vn`,
      password: md5(oldPass)
    }
    const checkAccount = await this.find(options);
    if(checkAccount.length > 0 && newPass == newPassConfirm){
      await this.connectDB();
      await this.conDb.collection(this.collectionName).updateOne({email: options.email}, {$set: {"password": md5(newPass)}});
      await this.closeDB();
      result = true;
    }
    return result;
  }

}

module.exports = UserDAO;
