import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GVLHP} from'../interfaces/gvlhp.interface'
//Get data asynchronously with Observable
import { Observable, from } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GvlhpService {

  private gvlhpURL = "https://localhost:4100/api/gvlhp";
  
//trinh phong bo sung
  getall(){
    return this.http.get(this.gvlhpURL);
  }
  //trinh phong post
  themGiaoVienLhp(GVLHP:GVLHP):Observable<GVLHP>{
      try {
       const apiUrl="https://localhost:4100/api/gvlhp/giaovienlophocphan"
        return this.http.post<GVLHP>(apiUrl, GVLHP, httpOptions)
      } catch (error) {
        return error;
      }
    }
  //trinhphong tim gvlhp theo magv:
  timGiaoVienLHPTheoMaGV(maGiaoVien:string){
    try {
      return this.http.get(`${this.gvlhpURL}/${maGiaoVien}`);
    } catch (error) {
      return error;
    }
  }
  changeGVLHP(maLHP: string, maGV: string): Observable<any> {
    return this.http.post<any>(this.gvlhpURL, [maLHP, maGV], httpOptions);
  }

  constructor(
    private http: HttpClient,
  ) { }
}
