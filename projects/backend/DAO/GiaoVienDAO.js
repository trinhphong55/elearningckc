const MongoDB = require('../MongoDB');
const Common = require('../common');
const { filter } = require('rxjs/operators');
class GiaoVienDAO extends MongoDB{
    constructor(){
        super();
        this.collectionName = 'GiaoVien';
        this.common = new Common();
    }

    async layDanhSachGiaoVien(){
        return await this.find({trangThai: 1});
    }

    async layThongTinGiaoVien(maGV){
        return await this.find({maGiaoVien: maGV});
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

    async kiemTraMaGiaoVienCoTonTai(maGV){
      let result = false;
      try{
        console.log('maGV', maGV);
        result = await this.find({maGiaoVien: maGV});
        console.log('result', result);
        if(result != false) return true;
      } catch (error){
        console.log('error: ', error.message);
        await this.closeDB();
      }
      return result;
    }

    async importExcel(data){
      let result = false;
      try{
        await this.connectDB();
        let filterData = []; //Mảng chứa danh sách giáo viên không bị trùng trong database
        console.log('data', data);
        this.common.asyncForEach(data, async element => {
          console.log('element', element);
          let isExist = await this.kiemTraMaGiaoVienCoTonTai(element.maGiaoVien);
          if(!isExist){
            filterData.push(element);
          }
        })
        console.log('filterData', filterData);
        await this.closeDB();
      } catch (error){
        console.log('error: ', error.message);
        await this.closeDB();
      }
      return result;
    }
}
module.exports = GiaoVienDAO;
