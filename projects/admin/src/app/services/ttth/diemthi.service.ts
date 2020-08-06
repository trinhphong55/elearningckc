import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ttthDiemThi } from '../../../models/ttthDiemThi';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DiemthiService {
  constructor(private http: HttpClient) { }
  //Import Excel
  importDiemThi(DiemThi: ttthDiemThi[]): Observable<any> {
    return this.http.post<ttthDiemThi[]>('https://localhost:4100/api/ttthDiemThi/importdiemthi', DiemThi, httpOptions).pipe(
      );
  }
}
