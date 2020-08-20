import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private baseUrl = 'https://localhost:4100/api/activity';
  constructor(private http: HttpClient) { }
  layDanhSachActivityElearning(): Observable<any> {
    return this.http.get(`${this.baseUrl}/1`);
  }
}
