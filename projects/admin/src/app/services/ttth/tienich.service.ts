import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthTienIch } from '../../../models/ttthTienIch';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TienichService {
  constructor(private http: HttpClient) { }
  get(): Observable<ttthTienIch[]  >{
    return this.http.get<ttthTienIch[] >('https://localhost:4100/api/ttthTienIch/list').pipe(
    );
  }
  add(newItem: ttthTienIch): Observable<ttthTienIch> {
    return this.http.post<ttthTienIch>('https://localhost:4100/api/ttthTienIch/add', newItem, httpOptions).pipe(
    );
  }
  update(updateItem: ttthTienIch): Observable<ttthTienIch> {
    return this.http.post<ttthTienIch>('https://localhost:4100/api/ttthTienIch/update', updateItem, httpOptions).pipe(
    );
  }
  delete(delItem: ttthTienIch): Observable<ttthTienIch> {
    return this.http.post<ttthTienIch>('https://localhost:4100/api/ttthTienIch/delete', delItem, httpOptions).pipe(
    );
  }
}
