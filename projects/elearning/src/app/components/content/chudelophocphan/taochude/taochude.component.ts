import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ChuDe } from './../../../../models/chu-de.interface';
import { ChuDeService } from './../../../../services/chu-de.service';
import { Component, OnInit, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-taochude',
  templateUrl: './taochude.component.html',
  styleUrls: ['./taochude.component.css'],
})
export class TaochudeComponent implements OnInit {
  checked: boolean = true;
  public maLopHocPhan: number = 1;
  public tenChuDe: string;
  public chuDe: ChuDe;
  public taiKhoan: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private chuDeService: ChuDeService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public themChuDe() {
    this.chuDeService
      .them({
        tenChuDe: this.tenChuDe,
        nguoiChinhSua: this.cookieService.get('email'),
        maLopHocPhan: this.data.maLopHocPhan,
      })
      .subscribe(
        (res) => {

        },
        (err) => {
          console.log(err);
        }
      );
  }
  ngOnInit(): void {

  }
}
