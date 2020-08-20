import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BinhLuanService {
  private baseUrl = 'https://localhost:4100/api/binhluan';
  constructor(private http: HttpClient) {}

  public layBinhLuan(loaiBaiViet,maBaiViet){
    return this.http.get(`${this.baseUrl}/${loaiBaiViet}/baiviet/${maBaiViet}`);
  }
  public layTatCaBinhLuan(){
    return this.http.get<any>(this.baseUrl);

  }
  public themBinhluan(data){
    return this.http.post(`${this.baseUrl}`,data);

  }
}
