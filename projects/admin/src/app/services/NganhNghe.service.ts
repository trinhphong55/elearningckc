import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { nganhnghe } from '../interfaces/NganhNghe.interface';
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
  private NganhNgheNull: nganhnghe;
  getNganhnghe(): Observable<nganhnghe[]> {
    try {
      return this.http.get<nganhnghe[]>(this.apiUrl)
    } catch (error) {
      return (error)
    }

  }
  //Lay 1nganh
  getDetailNganhNghe(_id: string): Observable<nganhnghe> {
    try {
      const url = `${this.apiUrl}/${_id}`;
      return this.http.get<nganhnghe>(this.apiUrl)
    } catch (error) {
      return(error)
    }

  }

  //Them moi 1nganh
  addnganhnghe(nganhnghe: nganhnghe): Observable<nganhnghe> {
    try {
      return this.http.post<nganhnghe>(this.apiUrl, nganhnghe, httpOptions)
    } catch (error) {
      return error;
    }

  }

  updateMonHoc(id, data) {
    try {
      return this.http.put(`${this.apiUrl}/${id}`, data);
    } catch (error) {
      return error;
    }
  }

  //Import nganhnghe from Excel
  importNganhNGheFromExcel(nganhnghe: nganhnghe[]): Observable<any> {
    return this.http.post<nganhnghe[]>(this.apiUrl + "/importexcel", nganhnghe, httpOptions).pipe(
      tap(selectedMonHoc => console.log(`importedExcel = thành công`)),
      catchError(error => of(this.NganhNgheNull))
    );
  }

  deledeNN(id) {
    try {
      return this.http.put(`${this.apiUrldelete}/${id}`, id);
    } catch (error) {
      return error;
    }

  }

  getNganhNghebymaBac(maBac: number): Observable<nganhnghe[]> {
    let url = "https://localhost:4100/api/dsnn"
    return this.http.get<nganhnghe[]>(`${url}/${maBac}`);
  }

}
