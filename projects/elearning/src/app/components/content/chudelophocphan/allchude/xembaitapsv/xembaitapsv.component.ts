import { FormControl } from '@angular/forms';
import { BinhLuanService } from './../../../../../services/binh-luan.service';
import { BaiTap } from './../../../../../models/bai-tap.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaiTapService } from '../../../../../services/bai-tap.service';

@Component({
  selector: 'app-xembaitapsv',
  templateUrl: './xembaitapsv.component.html',
  styleUrls: ['./xembaitapsv.component.css'],
})
export class XembaitapsvComponent implements OnInit {
  public baiTap: BaiTap;
  public dsBinhLuan: any;
  public binhLuan = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private baiTapService: BaiTapService,
    private binhLuanService: BinhLuanService
  ) {}

  ngOnInit(): void {
    this.xem_BaiTap();
  }
  public xem_BaiTap() {
    this.route.params.subscribe((params) => {
      this.baiTapService
        .layBaiTap_theoMaBaiTap(params.id)
        .subscribe((res: any) => {
          if (res.data) {
            this.baiTap = res.data;
            this.layDS_binhLuan_baiGiang(2, this.baiTap.maBaiTap);
          }
        });
    });
  }
  public layDS_binhLuan_baiGiang(LoaiBaiViet, maBaiViet) {
    this.binhLuanService.layBinhLuan(LoaiBaiViet, maBaiViet).subscribe(
      (res: any) => {
        res.data.forEach((element) => {
          element.ngayTao = new Date(element.ngayTao).toUTCString();
        });
        this.dsBinhLuan = res;
      },
      (err) => console.log(err)
    );
  }
  public onClick_BinhLuan(maBaiGiang) {
    this.themBinhLuan(maBaiGiang);
    this.xem_BaiTap();
    this.binhLuan.setValue('');
  }
  public themBinhLuan(maBaiGiang) {
    let data = {
      loaiBaiViet: '2',
      maBaiViet: maBaiGiang,
      noiDung: this.binhLuan.value,
      nguoiTao: '0306171249',
    };
    this.binhLuanService.themBinhluan(data).subscribe((res) => {});
  }
}
