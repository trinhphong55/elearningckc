import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ThoiKhoaBieuService {
  private baseUrl = 'https://localhost:4100/api/tkb';

  constructor(private http: HttpClient) {}

  public layThoiKhoaBieu(maLop, hocKi) {
    return this.http.get<any>(`${this.baseUrl}/malophoc/${maLop}/hocki/${hocKi}`);
  }
}
