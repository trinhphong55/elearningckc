import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LHDT } from '../interfaces/loaihinhdaotao.interface';

//Get data asynchronously with Observable
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LHDTService {

  private lhdtURL = "https://localhost:4100/api/lhdt";

  constructor(
    private http: HttpClient
  ) { }

  getLHDT(): Observable<LHDT[]> {
    return this.http.get<LHDT[]>(this.lhdtURL);
  }
}
