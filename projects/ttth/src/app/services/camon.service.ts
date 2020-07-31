import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthCamOn } from '../models/ttthCamOn';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CamonService {
  constructor(private http: HttpClient) { }
  get(): Observable<ttthCamOn[]  >{
    return this.http.get<ttthCamOn[] >('https://localhost:4100/api/ttthCamOn/').pipe(
    );
  }
}
