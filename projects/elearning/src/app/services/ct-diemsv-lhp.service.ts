import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root',
})
export class CtDiemsvLhpService {
  private baseUrl = 'https://localhost:4100/api/ct-diemsv-lophocphan';
  constructor(private http: HttpClient) {}

  public layCTtheoMaSV(maSv:string){
    return this.http.get(`${this.baseUrl}/${maSv}`);
  }
}
