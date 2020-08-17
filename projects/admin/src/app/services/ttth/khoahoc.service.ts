import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthKhoaHoc } from '../../../models/ttthKhoaHoc';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class KhoahocService {

  get(): Observable<ttthKhoaHoc[]  >{
    return this.http.get<ttthKhoaHoc[] >('https://localhost:4100/api/ttthKhoaHoc/list').pipe(
      retry(1),
      catchError(error => of([]))
    );
  }
  add(newItem: ttthKhoaHoc): Observable<ttthKhoaHoc> {
    return this.http.post<ttthKhoaHoc>('https://localhost:4100/api/ttthKhoaHoc/add', newItem, httpOptions).pipe(
    );
  }
  update(updateItem: ttthKhoaHoc): Observable<ttthKhoaHoc> {
    return this.http.post<ttthKhoaHoc>('https://localhost:4100/api/ttthKhoaHoc/update', updateItem, httpOptions).pipe(
    );
  }
  delete(deleteItem: ttthKhoaHoc): Observable<ttthKhoaHoc> {
    return this.http.post<ttthKhoaHoc>('https://localhost:4100/api/ttthKhoaHoc/delete', deleteItem, httpOptions).pipe(
    );
  }
  constructor(private http: HttpClient) { }

}
