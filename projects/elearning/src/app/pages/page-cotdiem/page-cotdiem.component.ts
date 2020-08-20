import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CotDiemLopHocPhanService } from '../../../../../admin/src/app/services/cotDiemLopHP.service';
import { BaiTapService } from '../../services/bai-tap.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-page-cotdiem',
  templateUrl: './page-cotdiem.component.html',
  styleUrls: ['./page-cotdiem.component.css']
})
export class PageCotodiemComponent implements OnInit {

  maLopHocPhan: string;
  dsCotDiem: any;
  dsBaiTap: any;
  suaBt: any;
  tenCotDiem: string = "";
  heSo: any;
  moTa: any;
  maBaiTap: number;
  arr: any;
  arrs: any;
  detail: any
  themBT: any;
  maCotDiem: any;
  quyenSua: string = 'none';
  quyenThem: string;
  err: string;
  formCotDiem = new FormGroup({
    tenCotDiem: new FormControl(),
    heSo: new FormControl(),
    moTa: new FormControl(),
    maBaiTap: new FormControl(),
  })
  constructor(private router: ActivatedRoute, private cotDiemLopHocPhanService: CotDiemLopHocPhanService,
    private baiTapService: BaiTapService,
    private toastrService:ToastrService) {
    this.maLopHocPhan = this.router.snapshot.paramMap.get('id');


  }

  ngOnInit(): void {
    //Lấy mã học phần từ URL
    this.hienThiCotDiem();
    this.danhSachBaiTap();
    this.xoaAll();
  }
  hienThiCotDiem() {
    this.cotDiemLopHocPhanService.layCotDiemByMaLopHP(this.router.snapshot.paramMap.get('id')).subscribe(
      dsCotDiem => {
        this.dsCotDiem = dsCotDiem;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  danhSachBaiTap() {
    this.baiTapService.layDS_theoLopHocPhan(this.router.snapshot.paramMap.get('id')).subscribe(
      dsBaiTap => {
        this.dsBaiTap = dsBaiTap.data;
        this.xoaAll()
      },
      (error) => {
        console.log(error);
      }
    )
  }
  xoaAll() {
    this.formCotDiem = new FormGroup({
      tenCotDiem: new FormControl(),
      heSo: new FormControl(),
      moTa: new FormControl(),
      maBaiTap: new FormControl(),
    })
    this.maCotDiem = "";
  }


  layCotDiemTheoMa(detail) {
    this.quyenSua = "";
    this.quyenThem = 'none'
    this.cotDiemLopHocPhanService.layCotDiemByMaLopHP(detail.maCotDiem).subscribe(
      (detail) => {
        this.detail = detail;
      },
      (error) => {
        console.log(error);
      }
    )
    this.formCotDiem = new FormGroup({
      tenCotDiem: new FormControl(detail.tenCotDiem),
      heSo: new FormControl(detail.heSo),
      moTa: new FormControl(detail.tinhDiem),
      maBaiTap: new FormControl(detail.maBaiTap),
    })
    this.maCotDiem = detail.maCotDiem
  }


  themDanhSachCotDiem() {
    if (this.formCotDiem.get('tenCotDiem').value == ''||this.formCotDiem.get('tenCotDiem').value == null || this.formCotDiem.get('heSo').value == '' || this.formCotDiem.get('moTa').value == '' ||  this.formCotDiem.get('maBaiTap').value == null ||  (this.formCotDiem.get('heSo').value) <0 || this.formCotDiem.get('heSo').value >5) {
        this.err="Dữ Liệu Không Được Để Trống hoặc hệ số không hợp lệ";
    }
    else {
      this.arr = { maLopHocPhan: this.router.snapshot.paramMap.get('id'), tenCotDiem: this.formCotDiem.get('tenCotDiem').value, heSo: this.formCotDiem.get('heSo').value, tinhDiem: this.formCotDiem.get('moTa').value, maBaiTap: this.formCotDiem.get('maBaiTap').value }
      this.cotDiemLopHocPhanService.themCotDiem(this.arr).subscribe(
        themBT => {
          this.themBT = themBT;
          this.hienThiCotDiem();
          this.xoaAll();
          this.err="";
          this.toastrService.success("Thêm Thành công ", 'Thông Báo', { timeOut: 6000 });

        },
        (error) => {
          console.log(error);
          this.toastrService.error("Thêm thất bại ", 'Thông Báo', { timeOut: 6000 });
        }
      )
    }
  }
  suaCotDiem() {
    
    if (  this.formCotDiem.get('heSo').value == null || this.formCotDiem.get('moTa').value =='' || this.formCotDiem.get('tenCotDiem').value ==''|| this.formCotDiem.get('maBaiTap').value == null ||  (this.formCotDiem.get('heSo').value) <0 || this.formCotDiem.get('heSo').value >5) {
      this.err="Dữ Liệu Không Được Để Trống hoặc hệ số không hợp lệ";
      
  }
  else{
    this.arrs = { tenCotDiem: this.formCotDiem.get('tenCotDiem').value, heSo: this.formCotDiem.get('heSo').value, tinhDiem: this.formCotDiem.get('moTa').value, maBaiTap: this.formCotDiem.get('maBaiTap').value }
    this.cotDiemLopHocPhanService.suaCotDiem(this.maCotDiem, this.arrs).subscribe(
      suaBt => {
        this.suaBt = suaBt;
        this.hienThiCotDiem();
        this.xoaAll();
        this.err="";
        this.quyenSua = "none";
        this.quyenThem = '';
        this.toastrService.success('Sửa thành công', ' thông báo', {
          timeOut:3000,
        });
      },
      (error) => {
        console.log(error);
        this.toastrService.error("Thêm thất bại ", 'Thông Báo', { timeOut: 6000 });
      }
    )
  }
}
}
