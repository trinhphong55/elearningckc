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
  private url = 'https://localhost:4100/api/sinhvien/malop';
  constructor(private http: HttpClient) { }

  public themSinhVien(data) {
    return this.http.post(this.baseUrl, data);
  }

  public tinhTongSinhVien(maLop: String) {
    return this.http.get<any>(`${this.baseUrl}/${maLop}/siso`);
  }
  public laysinhvien(maLop) {
    const url = `${this.url}/${maLop}`;
    return this.http.get<SinhVien>(url);

  }
  public getAll() {
    return this.http.get(this.baseUrl);
  }
  public getonesv(masv) {
    return this.http.get(`${this.baseUrl}/${masv}`);
  }
}
