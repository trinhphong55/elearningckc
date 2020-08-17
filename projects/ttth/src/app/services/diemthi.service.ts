import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class DiemthiService {
  constructor(private http: HttpClient) {}

  TraCuuDiem(mssv: string): Observable<any> {
    return this.http
      .get('https://localhost:4100/api/ttthDiemThi/tracuudiem=' + mssv)
      .pipe(retry(1));
  }
  TraCuuDiemTheoSBD(sbd: string): Observable<any> {
    return this.http
      .get('https://localhost:4100/api/ttthDiemThi/tracuudiemtheosbd=' + sbd)
      .pipe(retry(1));
  }
}
