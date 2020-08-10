const MongoDB = require('../MongoDB');
const md5 = require('md5');
class GiaoVienDAO extends MongoDB{
    constructor(){
        super();
        this.collectionName = 'GiaoVien';
    }

    async layDanhSachGiaoVien(){
        return await this.find({trangThai: 1});
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
            data[i].matKhauBanDau = md5('123456');
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
}
module.exports = GiaoVienDAO;
