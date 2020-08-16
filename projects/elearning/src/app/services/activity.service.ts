import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getCookie } from '../../../../common/helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private baseUrl = 'https://localhost:4100/api/activity';
  constructor(private http: HttpClient) { }

  loaiActivityLHP = 1;
  role = getCookie('role');
  nguoiThucHien = getCookie('email');
  name = getCookie('name');
  public layDanhSachActivityCuaLHP(maLHP: Number): Observable<any> {
    //Mã LHP lấy từ url
    return this.http.get(`${this.baseUrl}/${this.loaiActivityLHP}/lophocphan/${maLHP}`);
    // https://localhost:4100/api/activity/1/lophocphan/1
  }

  convertNoiDung(loaiDoiTuong: string, noiDung: string, hanhDong: string) {
    const dsDoiTuong = {
      "BT": "bài tập",
      "BG": "bài giảng",
      "BL-BT": "vào bài tập",
      "BL-BG": "vào bài giảng"
    }
    return `${this.name} đã ${hanhDong} ${dsDoiTuong[loaiDoiTuong]} "${noiDung}"`;
  }

  public themActivity(maLHP: number, maDoiTuong: number, loaiDoiTuong: string, noiDung: string, hanhDong: string): Observable<any> {
    const data = {
      'loaiActivity': this.loaiActivityLHP,
      'maLopHocPhan': maLHP,
      'maDoiTuong': maDoiTuong,
      'loaiDoiTuong': loaiDoiTuong,
      'noiDung': this.convertNoiDung(loaiDoiTuong, noiDung, hanhDong),
      'nguoiThucHien': this.nguoiThucHien,
      'role': this.role
    };
    return this.http.post(`${this.baseUrl}/them`, data);
  }
}
