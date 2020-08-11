import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class CotDiemSinhVienLopHocPhanService {
  private baseUrl = 'https://localhost:4100/api/cotdiemlhp';
  constructor(private http: HttpClient) {}

  public layTatCa(){
    return this.http.get(`${this.baseUrl}`);
  }
  public layCTtheoMaSV(maSv:String){
    return this.http.get(`${this.baseUrl}/${maSv}`);
  }
  public layDanhSachCotDiemTheoMaLHP(maLHP: string){
    return this.http.get(`${this.baseUrl}/lophocphan/${maLHP}`);
  }
}
