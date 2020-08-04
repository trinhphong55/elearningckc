import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



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

}
