const MongoDB = require('../MongoDB');
const JWT = require('jsonwebtoken');
const md5 = require('md5');
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
}
module.exports = SinhVienDAO;
