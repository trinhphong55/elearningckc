import { FormControl } from '@angular/forms';
import { BinhLuanService } from './../../../../../services/binh-luan.service';
import { BaiGiang } from '../../../../../models/bai-giang.interface';
import { BaiGiangService } from './../../../../../services/bai-giang.service';
import { ChuDeService } from './../../../../../services/chu-de.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChuDe } from './../../../../../models/chu-de.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chude2',
  templateUrl: './chude2.component.html',
  styleUrls: ['./chude2.component.css'],
})
export class Chude2Component implements OnInit {
  public chuDe: ChuDe;
  public dsBaiGiang: BaiGiang[] = [];
  public maLopHocPhan: number = 1;
  public dsBinhLuan_baiGiang: any[] = [];
  public binhLuan = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chuDeService: ChuDeService,
    private baiGiangService: BaiGiangService,
    private binhLuanService: BinhLuanService
  ) {}

  ngOnInit(): void {
    this.xem_ChuDe();
  }
  public formatDate(ngayChinhSua) {
    return (
      new Date(ngayChinhSua).toLocaleDateString() +
      ' - ' +
      new Date(ngayChinhSua).toLocaleTimeString()
    );
  }
  public layDS_binhLuan_baiGiang(LoaiBaiViet, maBaiViet) {

    this.binhLuanService.layBinhLuan(LoaiBaiViet, maBaiViet).subscribe(
      (res: any) => {

        res.data.forEach((element) => {
          element.ngayTao = new Date(element.ngayTao).toUTCString();
        });
        this.dsBinhLuan_baiGiang.push(res);
      },
      (err) => console.log(err)
    );
  }
  public xem_ChuDe() {
    this.route.params.subscribe((params) => {
      this.chuDeService.layMot(params.id).subscribe((res: any) => {
        if (res.data) {
          this.chuDe = res.data;
        }
      });
      this.baiGiangService.layTheoMaChuDe(params.id).subscribe((res: any) => {
        if (res.data) {
          this.dsBaiGiang = [];
          this.dsBinhLuan_baiGiang = [];
          this.dsBaiGiang = res.data;
          this.dsBaiGiang.forEach((el) => {
            el.ngayChinhSua = this.formatDate(el.ngayChinhSua);
            this.layDS_binhLuan_baiGiang(1, el.maBaiGiang);
          });
        }
      });
    });
  }
  public onClick_BinhLuan(maBaiGiang){

    this.themBinhLuan(maBaiGiang);
    this.xem_ChuDe();
    this.binhLuan.setValue('');
  }
  public themBinhLuan(maBaiGiang) {
    let data = {
      loaiBaiViet: '1',
      maBaiViet: maBaiGiang,
      noiDung: this.binhLuan.value,
      nguoiTao: '0306171249',
    };
    this.binhLuanService.themBinhluan(data).subscribe((res) => {

    });
  }
}
