import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SinhVienService {
  private baseUrl = "https://localhost:4100/api/sinhvien";

  constructor(private http:HttpClient) { }
  
  public themSinhVien(data){
    return this.http.post(this.baseUrl, data)
  }
}
