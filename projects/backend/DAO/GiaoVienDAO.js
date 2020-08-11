const MongoDB = require('../MongoDB');
const JWT = require('jsonwebtoken');
const md5 = require('md5');
class GiaoVienDAO extends MongoDB{
    constructor(){
        super();
        this.collectionName = 'GiaoVien';
    }

    async capNhatBoMon(maGV, maBoMon){
      let result = false;
      try{
        await this.connectDB();
        result = await this.conDb.collection(this.collectionName).updateOne({maGiaoVien: maGV}, {$set:{maBoMon: maBoMon}});
        await this.closeDB();
      } catch (error){
        console.log('error: ', error.message);
        await this.closeDB();
      }
      return result;
    }

    async layDanhSachGiaoVien(){
        return await this.find({trangThai: 1});
    }

    async layDanhSachGiaoVienTheoTrangThai(trangThai){
      return await this.find({trangThai: parseInt(trangThai)});
    }

    async restoreGiaoVien(maGV){
      let result = false;
      try{
        await this.connectDB();
        result = await this.conDb.collection(this.collectionName).updateOne({maGiaoVien: maGV}, {$set:{trangThai: 1}});
        await this.closeDB();
      } catch (error){
        console.log('error: ', error.message);
        await this.closeDB();
      }
      return result;
    }

    async layThongTinGiaoVien(maGV){
        return await this.find({maGiaoVien: maGV});
    }

    async layThongTinGiaoVienTheoEmail(email){
      return await this.find({email:email});
  }

    async layMaGVMoiNhat(){
      let result = false;
      try{
        await this.connectDB();
        result = await this.conDb.collection(this.collectionName).aggregate([
          {
            $sort: {
              _id: -1
            }
          }
        ]).toArray();
        await this.closeDB();
      } catch (error){
        console.log('error: ', error.message);
        await this.closeDB();
      }
      return result[0];
    }

    async themGiaoVien(){
        let result = false;
        let check = false;
        try{
            await this.connectDB();
            result = await this.conDb.collection(this.collectionName).insertOne({});
            await this.closeDB();
        } catch (error) {
            console.log('error: ', error.message);
            await this.closeDB();
        }
        return result;
    }

    async importExcel(data){
      let result = false;
      try{
        let filterData = []; //Mảng chứa danh sách giáo viên không bị trùng trong database
        let length = data.length;
        for(let i = 0; i < length; i++){
          let isExist = await this.layThongTinGiaoVien(data[i].maGiaoVien);
          if(isExist.length == 0){
            data[i].trangThai = 1;
            data[i].password = md5('123456');
            filterData.push(data[i]);
          }
        }
        if(filterData.length > 0){
          await this.connectDB();
          result = await this.conDb.collection(this.collectionName).insertMany(filterData);
          await this.closeDB();
        }
      } catch (error){
        console.log('error: ', error.message);
        await this.closeDB();
      }
      return result;
    }

    async getUser(email, password) {
      const list = await this.find({
        email,
        password: md5(password),
        trangThai: 1
      });
      return list;
    }

    async login(email, password) {
      const checkUser = await this.getUser(email, password);
      if (checkUser && checkUser.length) {
        const obj = { id: email, password };
        const token = JWT.sign(obj, '11111');
        const role = 'GV';
        const name = checkUser[0].ho + ' ' + checkUser[0].ten;
        return { token, role, email, name};
      }
      else {
        return false;
      }
    }
}
module.exports = GiaoVienDAO;
