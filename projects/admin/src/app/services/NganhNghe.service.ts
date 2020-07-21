import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { nganhnghe } from '../interface/NganhNghe.interface';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NganhNgheService {
  private apiUrl = "http://localhost:4100/api/nganhnghe";
  private apiUrldelete = "http://localhost:4100/api/deletenganhnghe";

  constructor(private http: HttpClient) { }

  getNgangnghe(): Observable<nganhnghe[]> {
    return this.http.get<nganhnghe[]>(this.apiUrl).pipe(
      tap(recivenganhnghe => console.log(`recivenganhnghe= ${JSON.stringify(recivenganhnghe)}`)),
      catchError(error => of([]))
    );
  }

  private NganhNgheNull: nganhnghe;

  //Lay 1nganh
  getDetailNganhNghe(nganhnghe): Observable<nganhnghe> {
    const url = `${this.apiUrl}/${nganhnghe._id}`;
    return this.http.get<nganhnghe>(url).pipe(
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

  //update nganhnghe
  updateMonHoc(nganhnghe: nganhnghe): Observable<any> {
    console.log(JSON.stringify(nganhnghe));
    return this.http.put(`${this.apiUrl}/${nganhnghe._id}`, nganhnghe, httpOptions).pipe(
      tap(updatedMonHoc => console.log(`updatedMonHoc = ${JSON.stringify(updatedMonHoc)}`)),
      catchError(error => of(this.NganhNgheNull))
    )
  }

  //delete nganh nghe
  deledeNN(id) {
    try {
      return this.http.put(`${this.apiUrldelete}/${id}`, id);
    } catch (error) {
      return error;
    }

  }

}
