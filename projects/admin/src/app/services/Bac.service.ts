import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import {bac} from '../interface/Bac.interface';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({
    providedIn: 'root'
})
export class BacService {
    private apiUrl = "http://localhost:4100/api/bac";


    constructor(private http: HttpClient) { }

    getBac(): Observable<bac[]> {
        return this.http.get<bac[]>(this.apiUrl).pipe(
         tap(recivenbac => console.log(`recivenbac= ${JSON.stringify(recivenbac)}`)),
         catchError(error => of([]))
        );
      }
  
    
    getTenbacFromMaBac(maBac) {
        const url = `${this.apiUrl}/${maBac}`;
        return this.http.get<bac>(url);
    
      }

}
