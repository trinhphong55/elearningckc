import { Component, OnInit } from '@angular/core';
import { setCookie, getCookie } from '../../../../../common/helper';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  displayName: string = '';
  ngOnInit(): void {
    this.displayName = getCookie('displayName');
  }

  onLogout(): void {
    console.log('logout');
    setCookie('token', '', '0');
    setCookie('role', '', '0');
    window.location.href="https://localhost:4200";
  }

}
