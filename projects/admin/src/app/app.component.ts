import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../app/services/auth/auth.service';
import { setCookie, getCookie } from '../../../common/helper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private toastr: ToastrService) {
    if (getCookie('token') && getCookie('role') == 'admin') {
      this.isLogged = true;
    }
    if (getCookie('role') && getCookie('role') != 'admin') {
      this.toastr.error('Tài khoản này không có quyền truy cập vào trang admin', 'ERROR', { timeOut: 6000 });
      window.location.href = 'http://localhost:4400';
    }
  }

  // Cờ đã đăng nhập
  isLogged: Boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z][a-z0-9_\.]{4,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    // remember: new FormControl(false),
    loaiTaiKhoan: new FormControl('3'),
  });
  //Validator
  get email() {
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
  }

  onLogout(): void {
    console.log('logout');
    setCookie('token', '', '0');
    setCookie('email', '', '0');
    setCookie('role', '', '0');
    setCookie('name', '', '0');
    window.location.href = 'https://localhost:4200';
  }

  onLogin(): void {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe((response) => {
        if (response.data != null && response.data.role == 'admin') {
          setCookie('token', response.data.token, '7');
          setCookie('role', response.data.role, '7');
          setCookie('name', response.data.name, '7');
          setCookie('email', response.data.email, '7');
          this.isLogged = true;
        }

        if (response.data != null && response.data.role != 'admin') {
          setCookie('token', response.data.token, '7');
          setCookie('role', response.data.role, '7');
          setCookie('email', response.data.email, '7');
          setCookie('name', response.data.name, '7');
          window.location.href = 'http://localhost:4400';
        }

        if (response.data == null) {
          this.toastr.error(response.msg, 'ERROR', { timeOut: 6000 });
        }

        if (response.data != null && response.data.role != 'admin') {
          this.toastr.error('Tài khoản này không có quyền truy cập vào trang admin', 'ERROR', { timeOut: 6000 });
        }
      });
    }
  }
}
