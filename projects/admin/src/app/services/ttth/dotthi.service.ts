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
export class DotthiService {

  get(): Observable<any[]  >{
    return this.http.get<any[] >('https://api.cnttckc.edu.vn/api/ttthDotThi/list').pipe(
      retry(1),
      catchError(error => of([]))
    );
  }
  add(newItem: any): Observable<any> {
    return this.http.post<any>('https://api.cnttckc.edu.vn/api/ttthDotThi/add', newItem, httpOptions).pipe(
    );
  }
  update(updateItem: any): Observable<any> {
    return this.http.post<any>('https://api.cnttckc.edu.vn/api/ttthDotThi/update', updateItem, httpOptions).pipe(
    );
  }
  delete(deleteItem: any): Observable<any> {
    return this.http.post<any>('https://api.cnttckc.edu.vn/api/ttthDotThi/delete', deleteItem, httpOptions).pipe(
    );
  }
  constructor(private http: HttpClient) { }
}
