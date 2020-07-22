import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import {nganhnghe} from '../interfaces/NganhNghe.interface';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable({
    providedIn: 'root'
})
export class NganhNgheService {
    private apiUrl = "https://localhost:4100/api/nganhnghe";
    private apiUrldelete = "https://localhost:4100/api/deletenganhnghe";

    constructor(private http: HttpClient) { }

    getNgangnghe(): Observable<nganhnghe[]> {
        return this.http.get<nganhnghe[]>(this.apiUrl).pipe(
         tap(recivenganhnghe => console.log(`recivenganhnghe= ${JSON.stringify(recivenganhnghe)}`)),
         catchError(error => of([]))
        );
      }
    
      private NganhNgheNull: nganhnghe;

      //Lay 1nganh
      getDetailNganhNghe(_id: string): Observable<nganhnghe> {
        const url = `${this.apiUrl}/${_id}`;
        return this.http.get<nganhnghe>(this.apiUrl).pipe(
          tap(selcetnganhnghe => console.log(`selcetnganhnghe = ${JSON.stringify(selcetnganhnghe)}`)),
          catchError(error => of(this.NganhNgheNull))
        )
      }
    
      //Them moi 1nganh
      addnganhnghe(nganhnghe: nganhnghe): Observable<nganhnghe> {
        return this.http.post<nganhnghe>(this.apiUrl, nganhnghe, httpOptions).pipe(
          tap(addNganhNghe => console.log(`addNganhNghe = ${JSON.stringify(addNganhNghe)}`)),
          catchError(error => of(this.NganhNgheNull))
        );
      }
    
      //Cap nhat 1nganh
      // ): Observable<any> {
      //   console.log(JSON.stringify(nganhnghe));
      //   return this.http.put(`${this.apiUrl}/${nganhnghe._id}`, nganhnghe, httpOptions).pipe(
      //     tap(updatenganhnghe => console.log(`updatenganhnghe = ${JSON.stringify(updatenganhnghe)}`)),
      //     catchError(error => of(this.NganhNgheNull))
      //   )
      // }
      updateMonHoc(id, data)
      {
        try {
          return this.http.put(`${this.apiUrl}/${id}`, data);
        } catch (error) {
          return error;
        }
      }
    
      //Import nganhnghe from Excel
      importNganhNGheFromExcel(nganhnghe: nganhnghe[]): Observable<any> {
        return this.http.post<nganhnghe[]>(this.apiUrl + "/importexcel", nganhnghe, httpOptions).pipe(
          tap(selectedMonHoc => console.log(`importedExcel = ${JSON.stringify(selectedMonHoc)}`)),
          catchError(error => of(this.NganhNgheNull))
        );
      }

      deledeNN(id) {
        try {
          return this.http.put(`${this.apiUrldelete}/${id}`,id);
        } catch (error) {
          return error;
        }
      
    }
    
  }
    