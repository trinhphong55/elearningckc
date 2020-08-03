const MongoDB = require('../MongoDB');
const md5 = require('md5');
const JWT = require('jsonwebtoken');
const { check } = require('express-validator');

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

  async login(email, password) {
    const checkUser = await this.getUser(email, password);
    if (checkUser && checkUser.length) {
      const obj = { id: email, password };
      const token = JWT.sign(obj, '11111');
      const role = checkUser[0].role;
      const displayName = checkUser[0].displayName;
      return { token, role, displayName};
    }
    else {
      return false;
    }
  }

}

module.exports = UserDAO;
