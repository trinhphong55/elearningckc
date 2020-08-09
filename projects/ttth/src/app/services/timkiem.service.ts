import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class TimkiemService {
  constructor(private http: HttpClient) {}

  searchTinTuc(query: string): Observable<any> {
    return this.http
      .get('https://localhost:4100/api/ttthTinTuc/search=' + query)
      .pipe(retry(1));
  }
}
