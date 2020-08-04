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
    return this.http.get(`${this.baseUrl}`,data);
  }

}
