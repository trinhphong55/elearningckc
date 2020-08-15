import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaiGiangService {
  private baseUrl = 'https://localhost:4100/api/baigiang';
  constructor(private http: HttpClient) {}

  public layTatCa() {
    return this.http.get(`${this.baseUrl}`);
  }
  public layTheoMaChuDe(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  public them(data){
    return this.http.post(`${this.baseUrl}`,data);
  }
  public layTheo_maLopHocPhan(maLopHocPhan){
    return this.http.get(`${this.baseUrl}/${maLopHocPhan}/lop-hoc-phan`);
  }
  public layTheo_maBaiGiang(maBaiGiang){
    return this.http.get(`${this.baseUrl}/${maBaiGiang}/ma-bai-giang`);

  }
  public xoa(maBaiGiang){
    return this.http.delete(`${this.baseUrl}/${maBaiGiang}`);
  }

}
