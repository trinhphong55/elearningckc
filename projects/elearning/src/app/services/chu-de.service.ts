import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChuDe } from '../models/chu-de.interface';



@Injectable({
  providedIn: 'root',
})
export class ChuDeService {
  private baseUrl = 'https://localhost:4100/api/chude';
  constructor(private http: HttpClient) {}

  public layTatCa(){
    return this.http.get(`${this.baseUrl}`);
  }
  public layMot(id){
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  public them(data){
    return this.http.post(`${this.baseUrl}`,data);
  }
  public layTheo_maLopHocPhan(maLopHocPhan): Observable<any>{
    return this.http.get<ChuDe[]>(`${this.baseUrl}/${maLopHocPhan}/lop-hoc-phan/`);
  }
  public xoa(maChuDe){
    return this.http.delete<any>(`${this.baseUrl}/${maChuDe}`);
  }

}
