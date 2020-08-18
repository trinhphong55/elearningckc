import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DangkikhoahocService {
  add(newItem: any): Observable<any> {
    return this.http.post<any>('https://localhost:4100/api/ttthDangKiKhoaHoc/add', newItem, httpOptions).pipe(
    );
  }
  getDKLH(): Observable<any[]  >{
    return this.http.get<any[] >('https://localhost:4100/api/ttthDangKiKhoaHoc/').pipe(
    );
  }
  constructor(private http: HttpClient) { }
}
