import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { setCookie, getCookie } from '../../../../../common/helper';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    console.log('login');
    setCookie('token', this.route.snapshot.queryParamMap.get('token'));
    setCookie('role', this.route.snapshot.queryParamMap.get('role'), '7');
    setCookie('email', this.route.snapshot.queryParamMap.get('email'), '7');
    setCookie('name', this.route.snapshot.queryParamMap.get('name'), '7');
    window.location.href='http://localhost:4400';
  }

  ngOnInit(): void {
  }

}
