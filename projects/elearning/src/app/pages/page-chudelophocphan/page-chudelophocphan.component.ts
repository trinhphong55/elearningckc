import { BaiTap } from './../../models/bai-tap.interface';
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
import { XembaitapgvComponent } from '../../components/content/chudelophocphan/allchude/xembaitapgv/xembaitapgv.component';
import { XembaitapsvComponent } from '../../components/content/chudelophocphan/allchude/xembaitapsv/xembaitapsv.component';
import { TaobaigiangComponent } from '../../components/content/chudelophocphan/taobaigiang/taobaigiang.component';
import { XembaiganggvComponent } from '../../components/content/chudelophocphan/allchude/xembaiganggv/xembaiganggv.component';
import { XembaigiangsvComponent } from '../../components/content/chudelophocphan/allchude/xembaigiangsv/xembaigiangsv.component';
import { BaiTapService } from '../../services/bai-tap.service';

@Component({
  selector: 'app-page-chudelophocphan',
  templateUrl: './page-chudelophocphan.component.html',
  styleUrls: ['./page-chudelophocphan.component.css'],
})
export class PageChudelophocphanComponent implements OnInit {
  public dsChuDe: ChuDe[] = [];
  public dsBaiGiang: BaiGiang[] = [];
  public dsBaiTap: BaiTap[] = [];
  public maLopHocPhan: number = 1;
  public dsBinhLuan_baiGiang: any[] = [];
  public dsBinhLuan_baiTap:any [] = [];

  // @Output  dsBaiGiang: BaiGiang[] = [];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private chuDeService: ChuDeService,
    private baiGiangService: BaiGiangService,
    private binhLuanService: BinhLuanService,
    private baiTapService: BaiTapService
  ) {}
  ngOnInit(): void {
    this.layDS_BaiGiang();
    this.layDS_ChuDe();
    this.layDS_BaiTap();
  }
  public layDS_BaiTap() {
    this.baiTapService.layDS_theoLopHocPhan(1).subscribe((res) => {
      this.dsBaiTap = res.data;
      this.dsBaiTap.forEach((bt) => {
        bt.ngayChinhSua =
          new Date(bt.ngayChinhSua).toLocaleDateString() +
          ' : ' +
          new Date(bt.ngayChinhSua).toLocaleTimeString();
          this.layDS_BinhLuan(2, bt.maBaiTap);
      });
    });
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
              new Date(el.ngayChinhSua).toLocaleDateString() +
              ' : ' +
              new Date(el.ngayChinhSua).toLocaleTimeString();
            this.layDS_BinhLuan(1, el.maBaiGiang);
          });
        }
      },
      (err) => console.log(err)
    );
  }
  public layDS_BinhLuan(LoaiBaiViet, maBaiViet) {
    this.binhLuanService.layBinhLuan(LoaiBaiViet, maBaiViet).subscribe(
      (res: any) => {
        res.data.forEach((element) => {
          element.ngayTao =
            new Date(element.ngayTao).toLocaleDateString() +
            ' : ' +
            new Date(element.ngayTao).toLocaleTimeString();
        });
        if(LoaiBaiViet == 1){
          this.dsBinhLuan_baiGiang.push(res);

        }else{
          this.dsBinhLuan_baiTap.push(res);
        }
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
      this.layDS_ChuDe();
      //this.layDS_BaiGiang();
    });
  }
  openTaotailieu() {
    this.dialog.open(TaobaigiangComponent, {
      width: '100%',
      height: '100vh',
      maxWidth: '90vw',
    });
  }
}
