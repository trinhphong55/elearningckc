const MongoDB = require('../MongoDB');
const JWT = require('jsonwebtoken');
const md5 = require('md5');
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
class SinhVienDAO extends MongoDB{
    constructor(){
      super();
      this.collectionName = 'SinhVien';
    }

    async getUser(email, password) {
      const list = await this.find({
        email,
        matKhau: md5(password),
        trangThai: 1
      });
      return list;
    }

    async login(email, password) {
      const checkUser = await this.getUser(email, password);
      if (checkUser && checkUser.length) {
        const obj = { id: email, password };
        const token = JWT.sign(obj, '11111');
        const role = 'SV';
        const name = checkUser[0].ho + ' ' + checkUser[0].ten;
        const mssv = checkUser[0].maSinhVien;
        const maLopHoc = checkUser[0].maLopHoc;
        return { token, role, email, name, mssv, maLopHoc};
      }
      else {
        return false;
      }
    }

    async changePassword(mssv, oldPass, newPass, newPassConfirm){
      let result = false;
      const options = {
        email: `${mssv}@caothang.edu.vn`,
        matKhau: md5(oldPass)
      }
      const checkAccount = await this.find(options);
      if(checkAccount.length > 0 && newPass == newPassConfirm){
        await this.connectDB();
        await this.conDb.collection(this.collectionName).updateOne({email: options.email}, {$set: {"matKhau": md5(newPass)}});
        await this.closeDB();
        result = true;
      }
      return result;
    }

    async getEmail(email){
      const list = await this.find({
        email,
        trangThai: 1
      });
      return list;
    }

    async resetPassword(email){
      const checkUser = await this.getEmail(email);
      // console.log('checkUser', checkUser);
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
                    const sinhVienDAO = new SinhVienDAO();
                    await sinhVienDAO.connectDB();
                    await sinhVienDAO.conDb.collection(sinhVienDAO.collectionName).updateOne({email: mail.to}, {$set: {"matKhau": md5(token.slice(160, 167))}});
                    await sinhVienDAO.closeDB();
                    return true;
                  }
              });
          }
      });
      }
      if(token) return true;
      return false;
    }
}
module.exports = SinhVienDAO;
