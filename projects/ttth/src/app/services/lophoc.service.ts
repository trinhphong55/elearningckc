import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class LophocService {
  constructor(private http: HttpClient) { }
  get(): Observable<any[]  >{
    return this.http.get<any[] >('https://localhost:4100/api/ttthLopHoc/').pipe(
    );
  }
}
