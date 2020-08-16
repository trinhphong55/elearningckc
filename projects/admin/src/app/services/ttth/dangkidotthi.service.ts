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
  constructor(private http: HttpClient) { }
  get(): Observable<any[]  >{
    return this.http.get<any[] >('https://api.cnttckc.edu.vn/api/ttthDangKiDotThi/').pipe(
    );
  }
  delete(deleteItem: any): Observable<any> {
    return this.http.post<any>('https://api.cnttckc.edu.vn/api/ttthDangKiDotThi/delete', deleteItem, httpOptions).pipe(
    );
  }
}
