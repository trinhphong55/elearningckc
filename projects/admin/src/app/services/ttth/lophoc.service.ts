import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthLopHoc } from '../../../models/ttthLopHoc';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class LophocService {

  get(): Observable<ttthLopHoc[]  >{
    return this.http.get<ttthLopHoc[] >('https://localhost:4100/api/ttthLopHoc/list').pipe(
      retry(1),
      catchError(error => of([]))
    );
  }
  getfilter(): Observable<ttthLopHoc[]  >{
    return this.http.get<ttthLopHoc[] >('https://localhost:4100/api/ttthLopHoc/').pipe(
      retry(1),
      catchError(error => of([]))
    );
  }
  add(newItem: ttthLopHoc): Observable<ttthLopHoc> {
    return this.http.post<ttthLopHoc>('https://localhost:4100/api/ttthLopHoc/add', newItem, httpOptions).pipe(
    );
  }
  update(updateItem: ttthLopHoc): Observable<ttthLopHoc> {
    return this.http.post<ttthLopHoc>('https://localhost:4100/api/ttthLopHoc/update', updateItem, httpOptions).pipe(
    );
  }
  delete(deleteItem: ttthLopHoc): Observable<ttthLopHoc> {
    return this.http.post<ttthLopHoc>('https://localhost:4100/api/ttthLopHoc/delete', deleteItem, httpOptions).pipe(
    );
  }
  constructor(private http: HttpClient) { }
}
