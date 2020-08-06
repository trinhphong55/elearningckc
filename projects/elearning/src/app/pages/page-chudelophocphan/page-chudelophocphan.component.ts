import { BinhLuan } from './../../models/binh-luan.interface';
import { BinhLuanService } from './../../services/binh-luan.service';
import { BaiGiang } from '../../models/bai-giang.interface';
import { BaiGiangService } from './../../services/bai-giang.service';
import { ChuDe } from './../../models/chu-de.interface';
import { ChuDeService } from './../../services/chu-de.service';
import { Component, OnInit, Input } from '@angular/core';
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
  public maLopHocPhan: number = 1;
  public dsBinhLuan_baiGiang: any[] = [];

  // @Output  dsBaiGiang: BaiGiang[] = [];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private chuDeService: ChuDeService,
    private baiGiangService: BaiGiangService,
    private binhLuanService: BinhLuanService
  ) {}
  ngOnInit(): void {
    this.layDS_BaiGiang();
    this.layDS_ChuDe();
  }

  public layDS_ChuDe() {
    this.chuDeService.layTheo_maLopHocPhan(this.maLopHocPhan).subscribe(
      (res: any) => {
        if (res.data) {
          this.dsChuDe = res.data;
        } else {
          console.log(res);
        }
      },
      (err) => console.log(err)
    );
  }
  public layDS_BaiGiang() {
    this.baiGiangService.layTatCa().subscribe(
      (res: any) => {
        if (res.data) {
          this.dsBaiGiang = res.data;
          this.dsBaiGiang.forEach((el) => {
            // el.ngayChinhSua = new Date(el.ngayChinhSua);
            el.ngayChinhSua =
              new Date(el.ngayChinhSua).getHours() +
              ':' +
              new Date(el.ngayChinhSua).getMinutes() +
              ' ngày: ' +
              new Date(el.ngayChinhSua).getDay() +
              '/' +
              new Date(el.ngayChinhSua).getMonth();
            console.log(el.maBaiGiang + ': ' + el.maChuDe);
            this.layDS_binhLuan_baiGiang(1, el.maBaiGiang);
          });
          console.log(this.dsBinhLuan_baiGiang);
        }
      },
      (err) => console.log(err)
    );
  }
  public layDS_binhLuan_baiGiang(LoaiBaiViet, maBaiViet) {
    this.binhLuanService.layBinhLuan(LoaiBaiViet, maBaiViet).subscribe(
      (res: any) => {
        this.dsBinhLuan_baiGiang.push(res);
      },
      (err) => console.log(err)
    );
  }
  openTaobaitap() {
    this.dialog.open(TaobaitapComponent, {
      width: '100%',
      height: '100vh',
      maxWidth: '90vw',
    });
  }
  opentaochude() {
    let dialog = this.dialog.open(TaochudeComponent, { width: '250px' });
    dialog.afterClosed().subscribe((res) => {
      console.log(res);
      this.layDS_ChuDe();
      this.layDS_BaiGiang();
    });
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
