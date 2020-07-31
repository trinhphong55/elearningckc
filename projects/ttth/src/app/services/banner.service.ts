import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthBanner } from '../models/ttthBanner';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }
  getBanner(): Observable<ttthBanner[]  >{
    return this.http.get<ttthBanner[] >('https://localhost:4100/api/ttthbanner/ttthdanhsachbanner').pipe(
    );
  }
}
