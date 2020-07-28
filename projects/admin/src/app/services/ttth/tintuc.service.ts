import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthTinTuc } from '../../../models/ttthTinTuc';
import { Thumbs } from 'swiper';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TintucService {

  private url='https://localhost:4100/api/ttthTinTuc/ttthdanhsachtintuc';

  getTinTuc(): Observable<ttthTinTuc[]>{
    return this.http.get<ttthTinTuc[]>(this.url).pipe(
      // tap(receivedTinTuc => console.log(`receivedTinTuc = ${JSON.stringify(receivedTinTuc)}`)),
      catchError(error => of([]))
    );
  }
  addTinTuc(newTinTuc: ttthTinTuc): Observable<ttthTinTuc> {
    return this.http.post<ttthTinTuc>('https://localhost:4100/api/ttthTinTuc/ttththemtintuc', newTinTuc, httpOptions).pipe(
      // tap((newTinTuc: ttthTinTuc) => console.log(`inserted TinTuc = ${JSON.stringify(newTinTuc)}`)),
      // catchError(error => of(new ttthTinTuc()))
    );
  }
  suaTinTuc(newTinTuc: ttthTinTuc): Observable<ttthTinTuc> {
    return this.http.post<ttthTinTuc>('https://localhost:4100/api/ttthTinTuc/ttthsuatintuc', newTinTuc, httpOptions).pipe(
      // tap((newTinTuc: ttthTinTuc) => console.log(`inserted TinTuc = ${JSON.stringify(newTinTuc)}`)),
      // catchError(error => of(new ttthTinTuc()))
    );
  }
  xoaTinTuc(newTinTuc: ttthTinTuc): Observable<ttthTinTuc> {
    return this.http.post<ttthTinTuc>('https://localhost:4100/api/ttthTinTuc/ttthxoatintuc', newTinTuc, httpOptions).pipe(
    );
  }
  constructor(private http: HttpClient) { }


}
