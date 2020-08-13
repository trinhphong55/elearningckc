import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl = 'https://localhost:4100/api/cotdiemlophocphan';
@Injectable({
  providedIn: 'root'
})

export class CotDiemLopHocPhanService  {

  constructor(private http:HttpClient) { }
  //lay cot diem theo ma lop hoc phan
  layCotDiemByMaLopHP(maLopHOcPhan:any) {
    return this.http.get(`${baseUrl}/${maLopHOcPhan}`);
  }
  //them cot diem
  themCotDiem(cotDiem:any){
    try {
      return this.http.post<any>(baseUrl, cotDiem)
    } catch (error) {
      return error;
    }
  }
  //chi tiet theo macotdiem
  layCotDiemTheoMaCotDiem(maCotDiem:any) {
    return this.http.get(`${baseUrl}/${maCotDiem}/chitiet`);
  }
  ///
  suaCotDiem(maCotDiem:any,cotDiem:any){
    try {
      const baseUrl = 'https://localhost:4100/api/suacotdiemlophocphan';
      return this.http.put<any>(`${baseUrl}/${maCotDiem}`, cotDiem)
    } catch (error) {
      return error;
    }
  }
}
