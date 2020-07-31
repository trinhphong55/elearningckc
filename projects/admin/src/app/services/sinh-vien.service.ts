import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { SinhVien } from '../interfaces/SinhVien.interface';
import { from } from 'rxjs';
=======

>>>>>>> 48e1195e2d5a2376092bcac7947d3ffed6ea278e
@Injectable({
  providedIn: 'root',
})
export class SinhVienService {
  private baseUrl = 'https://localhost:4100/api/sinhvien';
<<<<<<< HEAD
  private url = 'https://localhost:4100/api/sinhvien/malop';
  constructor(private http: HttpClient) { }
=======

  constructor(private http: HttpClient) {}
>>>>>>> 48e1195e2d5a2376092bcac7947d3ffed6ea278e

  public themSinhVien(data) {
    return this.http.post(this.baseUrl, data);
  }

  public tinhTongSinhVien(maLop: String) {
    return this.http.get<any>(`${this.baseUrl}/${maLop}/siso`);
  }
<<<<<<< HEAD
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
=======
  public laysinhvien(maLop: String){
    return this.http.get(`${this.baseUrl}/${maLop}`);
  }
  public getAll(){
    return this.http.get(this.baseUrl);
  }
  public getonesv(masv){
    return this.http.get(`${this.baseUrl}/${masv}`);
  }

  }
>>>>>>> 48e1195e2d5a2376092bcac7947d3ffed6ea278e
