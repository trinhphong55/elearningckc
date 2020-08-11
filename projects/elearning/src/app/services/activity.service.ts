import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private baseUrl = 'https://localhost:4100/api/activity';
  constructor(private http: HttpClient) {}

  loaiActivityLHP = 1;
  public layDanhSachActivityCuaLHP(maLHP: string): Observable<any> {
    //Mã LHP lấy từ url
    return this.http.get(`${this.baseUrl}/${this.loaiActivityLHP}/lophocphan/${maLHP}`);
    // https://localhost:4100/api/activity/1/lophocphan/1
  }

  public themActivity(maLHP: Number, nguoiThucHien: String, role: String, maDoiTuong: Number, loaiDoiTuong: String, noiDung: String){
    const data = {
      'loaiActivity': this.loaiActivityLHP,
      'maLopHocPhan': maLHP,
      'maDoiTuong': maDoiTuong,
      'loaiDoiTuong': loaiDoiTuong,
      'noiDung': noiDung,
      'nguoiThucHien': nguoiThucHien,
      'role': role
    };
    return this.http.post(`${this.baseUrl}/them`, data);
  }
}
