const MongoDB = require('../MongoDB');

class LopHocDAO extends MongoDB{
  constructor(){
    super();
    this.collectionName = 'LopHoc';
  }

  async layDanhLopHocTheoTungNganhCuaKhoa(khoa){
    let result = false;
    let data = {};
    try{
      await this.connectDB();
      let temp = await this.conDb.collection(this.collectionName).aggregate([
        {
          $match: {
            khoa: khoa
          }
        },
        {
          $group: {
            _id: "$maNganh",
            total: {$sum: 1}
          }
        },
        {
          $lookup: {
            from: 'NganhNghe',
            localField: '_id',
            foreignField: 'maNganhNghe',
            as: 'result'
          }
        },
        {
          $unwind: {
            path: "$result"
          }
        }
      ]).toArray();
      if(temp.length > 0){
        temp.map(nganh => {
          data = { ...data, ...{[nganh.result.tenNganhNghe]: nganh.total} };
        });
      }
      await this.closeDB();
    } catch (error){
      console.log('error: ', error.message);
      await this.closeDB();
    }
    if(Object.keys(data).length > 0){
      result = data;
    }
    return result;
  }

  async layDanhSachLopHocTheoTungNganhCuaNam(nam){
    let result = false;
    let khoa = nam.slice(2, 4);
    let data = await this.layDanhLopHocTheoTungNganhCuaKhoa(khoa);
    if(data){
      result = {[nam]: data };
    }
    return result;
  }
}

module.exports = LopHocDAO
