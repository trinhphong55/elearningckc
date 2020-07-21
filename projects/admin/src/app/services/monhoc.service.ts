import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MonHoc } from '../interfaces/monhoc.interface';

//Get data asynchronously with Observable
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MonhocService {

  private monHocURL = "https://localhost:4100/api/monhoc";
  constructor(
    private http: HttpClient ) {}

  getMonHoc(): Observable<MonHoc[]> {
    return this.http.get<MonHoc[]>(this.monHocURL).pipe(
      tap(receivedMonHocs => console.log(`receivedMonHocs = ${JSON.stringify(receivedMonHocs)}`)),
      catchError(error => of([]))
    );
  }

  private monHocNull: MonHoc;

  //Import MonHoc from Excel
  importMonHocFromExcel(monHoc: MonHoc[]): Observable<any> {
    return this.http.post<MonHoc[]>(this.monHocURL + "/importexcel", monHoc, httpOptions).pipe(
      tap(selectedMonHoc => console.log(`importedExcel = ${JSON.stringify(selectedMonHoc)}`)),
      catchError(error => of(this.monHocNull))
    );
  }

  //Lay 1 mon hoc
  getMonHocFromMaMonHoc(maMonHoc: string): Observable<MonHoc> {
    const url = `${this.monHocURL}/${maMonHoc}`;
    return this.http.get<MonHoc>(url).pipe(
      tap(selectedMonHoc => console.log(`selectedMonHoc = ${JSON.stringify(selectedMonHoc)}`)),
      catchError(error => of(this.monHocNull))
    )
  }

  //Them moi 1 mon hoc
  addMonHoc(monHoc: MonHoc): Observable<any> {
    return this.http.post<any>(this.monHocURL, monHoc, httpOptions).pipe(
      tap(addedMonHoc => console.log(`addedMonHoc = ${JSON.stringify(addedMonHoc)}`)),
      catchError(error => of(this.monHocNull))
    );
  }

  //Cap nhat 1 mon hoc
  updateMonHoc(monHoc: MonHoc): Observable<any> {
    return this.http.put<any>(`${this.monHocURL}/${monHoc.maMonHoc}`, monHoc, httpOptions).pipe(
      tap(updatedMonHoc => console.log(`updatedMonHoc = ${JSON.stringify(updatedMonHoc)}`)),
      catchError(error => of(this.monHocNull))
    )
  }

  //Xoa vinh vien 1 mon hoc
  deleteMonHoc(maMonHoc: string): Observable<any> {
    console.log(maMonHoc);
    return this.http.delete(`${this.monHocURL}/${maMonHoc}`, httpOptions).pipe(
      tap(deletedMonHoc => console.log(`updatedMonHoc = ${JSON.stringify(deletedMonHoc)}`)),
      catchError(error => of(this.monHocNull))
    )
  }
}
