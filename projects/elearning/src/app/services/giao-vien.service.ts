import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn:'root',
})
export class GiaoVienService{
    private baseUrl='https://localhost:4100/api/GiaoVien/thong-tin-giao-vien-email';
    private baseUrlcapnhap='https://localhost:4100/api/GiaoVien/cap-nhat-giao-vien-new-tt';
    
    constructor (private http:HttpClient){}
    public Laythongtingiaovien(email:any){
        return this.http.get<any>(`${this.baseUrl}/${email}`);
    }
    public CapNhapgv(magv:any){
        return this.http.post<any>(`${this.baseUrlcapnhap}`,magv);
    }
}