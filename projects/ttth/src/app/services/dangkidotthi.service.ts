import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DangkidotthiService {
  add(newItem: any): Observable<any> {
    return this.http.post<any>('https://localhost:4100/api/ttthDangKiDotThi/add', newItem, httpOptions).pipe(
    );
  }
  getDKDT(): Observable<any[]  >{
    return this.http.get<any[] >('https://localhost:4100/api/ttthDangKiDotThi/').pipe(
    );
  }
  getDotThi(): Observable<any[]  >{
    return this.http.get<any[] >('https://localhost:4100/api/ttthDotThi/').pipe(
    );
  }
  constructor(private http: HttpClient) { }
}
