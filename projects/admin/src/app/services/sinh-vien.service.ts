import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SinhVien } from '../interfaces/SinhVien.interface';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SinhVienService {
  private baseUrl = 'https://localhost:4100/api/sinhvien';

  constructor(private http: HttpClient) {}

  public themSinhVien(data) {
    return this.http.post(this.baseUrl, data);
  }
  public capNhatSinhVien(data){
    return this.http.put(this.baseUrl, data);
  }

  public tinhTongSinhVien(maLop: String) {
    return this.http.get<any>(`${this.baseUrl}/${maLop}/siso`);
  }
  //trinh phong  sua
  public laysinhvien(maLop: String) {
    return this.http.get(`${this.baseUrl}/${maLop}/malop`);
  }
  public getAll() {
    return this.http.get(this.baseUrl);
  }
  public getonesv(masv) {
    return this.http.get(`${this.baseUrl}/${masv}`);
  }
  //tim sinh vien theo lop hoc phan
  public layDsSvByLopHP(maLopHocPhan: any) {
    return this.http.get(`${this.baseUrl}/${maLopHocPhan}/lophocphan`);
  }
  public capNhatSiSoLopHocPhan(maLopHoc){
    return this.http.get<any>(`${this.baseUrl}/${maLopHoc}/sisolhp`);
  }
}
