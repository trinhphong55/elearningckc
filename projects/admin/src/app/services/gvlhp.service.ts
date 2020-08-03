import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Get data asynchronously with Observable
import { Observable } from 'rxjs';

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
  changeGVLHP(maLHP: string, maGV: string): Observable<any> {
    return this.http.post<any>(this.gvlhpURL, [maLHP, maGV], httpOptions);
  }

  constructor(
    private http: HttpClient,
  ) { }
}
