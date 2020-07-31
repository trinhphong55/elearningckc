import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}

  // Cờ đã đăng nhập
  // isLogged: Boolean = false;
  isLogged: Boolean = true;

  // Account
  account = {
    email: 'admin',
    password: '123',
  };

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    remember: new FormControl(false),
  });

  ngOnInit(): void {}

  logData(): void {
    console.log(this.loginForm.value);
  }

  onLogin(): void {
    if (
      this.account.email === this.loginForm.get('email').value &&
      this.account.password === this.loginForm.get('password').value
    ) {
      this.isLogged = false;
      alert('Đăng nhập thành công');
    }
  }
}
