import { BaiGiang } from '../../models/bai-giang.interface';
import { BaiGiangService } from './../../services/bai-giang.service';
import { ChuDe } from './../../models/chu-de.interface';
import { ChuDeService } from './../../services/chu-de.service';
import { Component, OnInit } from '@angular/core';
import { TaobaitapComponent } from '../../components/content/chudelophocphan/taobaitap/taobaitap.component';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaochudeComponent } from '../../components/content/chudelophocphan/taochude/taochude.component';
import { TaobaiktraComponent } from '../../components/content/chudelophocphan/taobaiktra/taobaiktra.component';
import { TaocauhoiComponent } from '../../components/content/chudelophocphan/taocauhoi/taocauhoi.component';
import { TaotailieuComponent } from '../../components/content/chudelophocphan/taotailieu/taotailieu.component';
import { XembaitapgvComponent } from '../../components/content/chudelophocphan/allchude/xembaitapgv/xembaitapgv.component';
import { XemtailieugvComponent } from '../../components/content/chudelophocphan/allchude/xemtailieugv/xemtailieugv.component';
import { XemtailieusvComponent } from '../../components/content/chudelophocphan/allchude/xemtailieusv/xemtailieusv.component';
import { XembaitapsvComponent } from '../../components/content/chudelophocphan/allchude/xembaitapsv/xembaitapsv.component';

@Component({
  selector: 'app-page-chudelophocphan',
  templateUrl: './page-chudelophocphan.component.html',
  styleUrls: ['./page-chudelophocphan.component.css'],
})
export class PageChudelophocphanComponent implements OnInit {

  public dsChuDe: ChuDe[] = [];
  public dsBaiGiang: BaiGiang[] = [];


  constructor(
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private route: Router,
    private chuDeService: ChuDeService,
    private baiGiangService: BaiGiangService
  ) {}
  ngOnInit(): void {
    this.layDS_BaiGiang();
    this.layDS_ChuDe();
  }

  public layDS_ChuDe() {
    this.chuDeService.layTatCa().subscribe((res: any) => {
      if (res.data) {
        this.dsChuDe = res.data;

      } else {
        console.log(res);
      }
    }, err => console.log(err));
  }
  public layDS_BaiGiang() {
    this.baiGiangService.layTatCa().subscribe((res: any) => {
      if (res.data) {
        this.dsBaiGiang = res.data;

        this.dsBaiGiang.forEach((el) => {
          el.ngayChinhSua = new Date(el.ngayChinhSua).toUTCString();
        });
      }
    }, err => console.log(err));
  }
  openTaobaitap() {
    this.dialog.open(TaobaitapComponent, {
      width: '100%',
      height: '100vh',
      maxWidth: '90vw',
    });
  }
  opentaochude() {
    this.dialog.open(TaochudeComponent, { width: '250px' });
  }
  openTaobaiktra() {
    this.dialog.open(TaobaiktraComponent, {
      width: '100%',
      height: '100vh',
      maxWidth: '90vw',
    });
  }
  openTaocauhoi() {
    this.dialog.open(TaocauhoiComponent, {
      width: '100%',
      height: '100vh',
      maxWidth: '90vw',
    });
  }
  openTaotailieu() {
    this.dialog.open(TaotailieuComponent, {
      width: '100%',
      height: '100vh',
      maxWidth: '90vw',
    });
  }
  openXBTGV() {
    this.dialog.open(XembaitapgvComponent, {
      width: '100%',
      height: '100vh',
      maxWidth: '90vw',
    });
  }
  openXTLGV() {
    this.dialog.open(XemtailieugvComponent, {
      width: '100%',
      height: '100vh',
      maxWidth: '90vw',
    });
  }
  openXTLSV() {
    this.dialog.open(XemtailieusvComponent, {
      width: '100%',
      height: '100vh',
      maxWidth: '90vw',
    });
  }
  openXBTSV() {
    this.dialog.open(XembaitapsvComponent, {
      width: '100%',
      height: '100vh',
      maxWidth: '90vw',
    });
  }
}
