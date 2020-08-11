import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class BaiTapSinhVienService {

    private baiTapURL = "https://localhost:4100/api/baitapsinhvien";
    ///lay danh sach bt
    public getall() {
        return this.http.get<any>(this.baiTapURL, httpOptions);
    }
    public xoabaitap(id:any) {
        return this.http.put<any>(this.baiTapURL+`/${id}/xoabaitap`, httpOptions);
    }
    addbtSV(baitapsv: any): Observable<any> {
        return this.http.post<any>(this.baiTapURL+`/uploads`, baitapsv, httpOptions);
      }
    addBaiTap(baitap: any): Observable<any> {
        return this.http.post<any>(this.baiTapURL, baitap, httpOptions);
    }
    public layDS_theoLopHocPhan(maLopHocPhan) {
        return this.http.get<any>(this.baiTapURL + `/${maLopHocPhan}/lop-hoc-phan`, httpOptions);
    }
    public layBttheosinhvien(maSinhVien:string,maBaiTap:string) {
        return this.http.get<any>(this.baiTapURL + `/${maSinhVien}/${maBaiTap}/baitap`, httpOptions);
    }
    constructor(
        private http: HttpClient) { }
}
