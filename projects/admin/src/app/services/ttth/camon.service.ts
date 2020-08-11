import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthCamOn } from '../../../models/ttthCamOn';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CamonService {

  constructor(private http: HttpClient) { }
  get(): Observable<ttthCamOn[]  >{
    return this.http.get<ttthCamOn[] >('https://localhost:4100/api/ttthCamOn/list').pipe(
    );
  }
  add(newItem: ttthCamOn): Observable<ttthCamOn> {
    return this.http.post<ttthCamOn>('https://localhost:4100/api/ttthCamOn/add', newItem, httpOptions).pipe(
    );
  }
  update(newBanner: ttthCamOn): Observable<ttthCamOn> {
    return this.http.post<ttthCamOn>('https://localhost:4100/api/ttthCamOn/update', newBanner, httpOptions).pipe(
    );
  }
  delete(newBanner: ttthCamOn): Observable<ttthCamOn> {
    return this.http.post<ttthCamOn>('https://localhost:4100/api/ttthCamOn/delete', newBanner, httpOptions).pipe(
    );
  }
}
