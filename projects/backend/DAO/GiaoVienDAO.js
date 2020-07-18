const MongoDB = require('../MongoDB');
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
}
module.exports = GiaoVienDAO;
