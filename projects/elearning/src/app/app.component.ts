import { Component, OnInit } from '@angular/core';
import { setCookie, getCookie } from '../../../common/helper';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'elearning';
  tenTaiKhoan:any

  email: string = '';
  quyenGV:string="";
  quyenHS:string="";
  doiTuong:any;
  constructor(private cookie: CookieService){
    if(getCookie('token')){
      if(getCookie('role') == 'admin'){
        alert('Bạn không có quyền cập vào trang elearning');
        window.location.href = "https://localhost:4200";
      }else{
        this.email = getCookie('email');
      }
    }
    else{
      window.location.href = "https://localhost:4200";
    }
  }
  ngOnInit(): void {
       this.tenTaiKhoan = getCookie('name');
       this.quyenXemDiem();
  }

  onLogout(): void {
    console.log('logout');
    setCookie('token', '', '0');
    setCookie('email', '', '0');
    setCookie('role', '', '0');
    setCookie('name', '', '0');
    window.location.href = "https://localhost:4200";
  }
  quyenXemDiem()
  {
    this.doiTuong = this.cookie.get("role");
    if(this.doiTuong== 'SV')
    {
      this.quyenGV='none'
      this.quyenHS='';
    }
    else{
      this.quyenHS='none';
      this.quyenGV=''
    }
  }
}
