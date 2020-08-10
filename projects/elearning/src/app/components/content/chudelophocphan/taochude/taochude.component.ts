import { Router, ActivatedRoute } from '@angular/router';
import { ChuDe } from './../../../../models/chu-de.interface';
import { ChuDeService } from './../../../../services/chu-de.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private chuDeService: ChuDeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public themChuDe() {
    this.chuDeService
      .them({
        tenChuDe: this.tenChuDe,
        nguoiChinhSua: 'trandinhuy',
        maLopHocPhan: this.maLopHocPhan,
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  ngOnInit(): void {}
}
