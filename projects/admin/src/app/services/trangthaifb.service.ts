import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://localhost:4100/api/trangthaifb';
@Injectable({
  providedIn: 'root'
})
export class TrangThaifbService {
    constructor(private http:HttpClient) { }
    getAll(){
        return this.http.get(baseUrl);
    }
    
}

