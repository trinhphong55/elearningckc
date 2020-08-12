import { Component, OnInit } from '@angular/core';
import { setCookie, getCookie } from '../../../common/helper';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'elearning';
  tenTaiKhoan:any

  email: string = '';
  constructor(){
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
       this.tenTaiKhoan = getCookie('name')
  }

  onLogout(): void {
    console.log('logout');
    setCookie('token', '', '0');
    setCookie('email', '', '0');
    setCookie('role', '', '0');
    setCookie('name', '', '0');
    window.location.href = "https://localhost:4200";
  }

}
