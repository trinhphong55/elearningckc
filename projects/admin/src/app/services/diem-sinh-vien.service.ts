import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'https://localhost:4100/api/diemsinhvien';
@Injectable({
  providedIn: 'root'
})

export class DiemSinhVienService  {

  constructor(private http:HttpClient) { }
  getAllFor(maSinhvien) {
    return this.http.get(`${baseUrl}/${maSinhvien}/search`);
  }
  ///thong tin diem sinh vien 
  layThongTinDiemSVByLHP(maLopHOcPhan:any) {
    return this.http.get(`${baseUrl}/${maLopHOcPhan}/laytongdiem`);
  }

  //luu tong diem
  luuDiem(diemTongKet:any,maLopHOcPhan:any){
    try {
      return this.http.post<any>(`${baseUrl}/${maLopHOcPhan}`, diemTongKet)
    } catch (error) {
      return error;
    }
  }
}
