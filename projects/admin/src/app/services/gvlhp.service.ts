import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Get data asynchronously with Observable
import { Observable } from 'rxjs';
import { LopHocPhan } from '../interfaces/lophocphan.interface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GvlhpService {

  private lophocphanURL = "https://localhost:4100/api/gvlhp";

  constructor(
    private http: HttpClient,
  ) { }
}
