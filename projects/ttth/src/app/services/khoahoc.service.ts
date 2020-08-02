import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthKhoaHoc } from '../models/ttthKhoaHoc';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class KhoahocService {
  constructor(private http: HttpClient) { }
  get(): Observable<ttthKhoaHoc[]  >{
    return this.http.get<ttthKhoaHoc[] >('https://localhost:4100/api/ttthKhoaHoc/').pipe(
    );
  }
}
