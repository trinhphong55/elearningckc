import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import {bac} from '../interfaces/Bac.interface';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({
    providedIn: 'root'
})
export class BacService {
    private apiUrl = "https://localhost:4100/api/bac";


    constructor(private http: HttpClient) { }

    getBac(): Observable<bac[]> {
        return this.http.get<bac[]>(this.apiUrl)
      }
  
    
    getTenbacFromMaBac(maBac) {
        const url = `${this.apiUrl}/${maBac}`;
        return this.http.get<bac>(url);
    
      }

}
