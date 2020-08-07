const MongoDB = require('../MongoDB');

class LopHocDAO extends MongoDB{
  constructor(){
    super();
    this.collectionName = 'LopHoc';
  }

  async layDanhLopHocTheoTungNganhCuaKhoa(khoa){
    let result = false;
    let series = [];
    let labels = [];
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
      temp.map(nganh => {
        series.push(nganh.total);
        labels.push(nganh.result.tenNganhNghe);
      })
      await this.closeDB();
    } catch (error){
      console.log('error: ', error.message);
      await this.closeDB();
    }

    if(series.length > 0 && labels.length > 0){
      result = {
        'series': series,
        'labels': labels
      }
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
