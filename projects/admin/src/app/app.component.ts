import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../app/services/auth/auth.service';
import { setCookie, getCookie } from '../../../common/helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  // Cờ đã đăng nhập
  isLogged: Boolean = true;
  // isLogged: Boolean = false;

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    remember: new FormControl(false),
    loaiTaiKhoan: new FormControl("3")
  });

  ngOnInit(): void {
    if(getCookie('token') && getCookie('role') == 'admin'){
      this.isLogged = true;
    }
    if(getCookie('role') && getCookie('role') != 'admin'){
      alert('Bạn không có quyền cập vào trang admin');
      window.location.href = "http://localhost:4400";
    }
  }

  onLogout(): void {
    console.log('logout');
    setCookie('token', '', '0');
    setCookie('email', '', '0');
    setCookie('role', '', '0');
    window.location.href = "https://localhost:4200";
  }

  onLogin(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        if(response.data != null && response.data.role == 'admin'){
          setCookie('token', response.data.token, '7');
          setCookie('role', response.data.role, '7');
          setCookie('email', response.data.email, '7');
          this.isLogged = true;
        }

        if(response.data != null && response.data.role != 'admin'){
          setCookie('token', response.data.token, '7');
          setCookie('role', response.data.role, '7');
          setCookie('email', response.data.email, '7');
          setCookie('name', response.data.name, '7');
          window.location.href = "http://localhost:4400";
        }

        if(response.data == null){
          alert(response.msg);
        }

        if(response.data != null && response.data.role != 'admin'){
          alert('Bạn không có quyền cập vào trang admin');
        }
      }
    )
  }
}
