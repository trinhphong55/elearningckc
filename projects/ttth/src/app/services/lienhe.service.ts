import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class LienheService {
  add(newItem: any): Observable<any> {
    return this.http.post<any>('https://localhost:4100/api/ttthLienHe/add', newItem, httpOptions).pipe(
    );
  }
  constructor(private http: HttpClient) { }
}
