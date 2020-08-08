import { SinhVien } from './../models/SinhVien.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SinhVienService {
  private baseUrl = 'https://localhost:4100/api/sinhvien';

  constructor(private http: HttpClient) {}

  public themSinhVien(data) {
    return this.http.post(this.baseUrl, data);
  }

  public tinhTongSinhVien(maLop) {
    return this.http.get<any>(`${this.baseUrl}/${maLop}/siso`);
  }
  public laysinhvien(maLop) {
    return this.http.get(`${this.baseUrl}/${maLop}`);
  }
  public getAll() {
    return this.http.get(this.baseUrl);
  }
  public getonesv(masv) {
    return this.http.get<any>(`${this.baseUrl}/${masv}`);
  }
  public capNhatSinhVien(data) {
    return this.http.put(this.baseUrl, data);
  }
}
