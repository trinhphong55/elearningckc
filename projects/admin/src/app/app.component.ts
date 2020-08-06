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
  // isLogged: Boolean = true;
  isLogged: Boolean = true;

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    remember: new FormControl(false),
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

  onLogin(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        if(response.data != null && response.data.role == 'admin'){
          setCookie('token', response.data.token, '7');
          setCookie('role', response.data.role, '7');
          setCookie('displayName', response.data.displayName, '7');
          this.isLogged = true;
        }

        if(response.data != null && response.data.role != 'admin'){
          setCookie('token', response.data.token, '7');
          setCookie('role', response.data.role, '7');
          setCookie('displayName', response.data.displayName, '7');
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
