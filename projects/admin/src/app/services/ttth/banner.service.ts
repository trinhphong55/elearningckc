import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthBanner } from '../../../models/ttthBanner';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }
  getBanner(): Observable<ttthBanner[]  >{
    return this.http.get<ttthBanner[] >('https://localhost:4100/api/ttthbanner/').pipe(
    );
  }
  addBanner(newBanner: ttthBanner): Observable<ttthBanner> {
    return this.http.post<ttthBanner>('https://localhost:4100/api/ttthBanner/ttththemBanner', newBanner, httpOptions).pipe(
    );
  }
  suaBanner(newBanner: ttthBanner): Observable<ttthBanner> {
    return this.http.post<ttthBanner>('https://localhost:4100/api/ttthBanner/ttthsuabanner', newBanner, httpOptions).pipe(
      // tap((newBanner: ttthBanner) => console.log(`inserted TinTuc = ${JSON.stringify(newBanner)}`)),
      // catchError(error => of(new ttthBanner()))
    );
  }
  xoaBanner(newBanner: ttthBanner): Observable<ttthBanner> {
    return this.http.post<ttthBanner>('https://localhost:4100/api/ttthBanner/ttthxoabanner', newBanner, httpOptions).pipe(
    );
  }
}
