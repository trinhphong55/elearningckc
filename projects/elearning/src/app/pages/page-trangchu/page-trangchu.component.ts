
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LopHocPhanService } from '../../../../../admin/src/app/services/lophocphan.service';
import { LopHocService } from '../../../../../admin/src/app/services/lop-hoc.service';
import { GvlhpService } from '../../../../../admin/src/app/services/gvlhp.service';
import { ApiService } from '../../../../../admin/src/app/services/api.service';
import { SinhVienService } from '../../../../../admin/src/app/services//sinh-vien.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-page-trangchu',
  templateUrl: './page-trangchu.component.html',
  styleUrls: ['./page-trangchu.component.css']
})
export class PageTrangchuComponent implements OnInit {
  Doituong: any = 1;
  dsLop: any;
  dsLopHP: any = [];
  maLopHoc: string;
  maLopHocPhan: any;
  filterDsLop: any;
  dsGiaoVien: any;
  dsGiaoVienLopHP: any;
  dsSinhVien: any;
  maBac: any;
  hocKi: any = 1;
  maKhoa: any = 1;
  // formDanhSachLop = new FormGroup({
  //   maLopHoc: new FormControl(),
  // })
  lophocs = [{ id: 1, name: 'Cơ sử dữ liệu', status: true },
  { id: 2, name: 'Nhập môn lập trình', status: true },
  { id: 3, name: 'Cấu trúc dữ liệu', status: true },
  { id: 4, name: 'Toán rời rạc', status: true },
  { id: 5, name: 'Lập trình laravel', status: true },
  { id: 6, name: 'lập trình HDT', status: true }
  ];
  constructor(
    private lopHocPhanService: LopHocPhanService,
    private lopHocService: LopHocService,
    private gvlhpService: GvlhpService,
    private apiService: ApiService,
    private SinhVienService: SinhVienService,
    private cookie: CookieService) { }

  ngOnInit(): void {
    this.danhSachLop();
    this.danhSachGV();
    this.danhSachGVLHP();
    this.danhSachLopHocPhan();
    this.danhSachSinhVien();
    this.layCookie();
    this.dsLopGiaoVien();
  }
  // lay cookie
  layCookie() {
    this.maKhoa = this.cookie.get("khoa")
    this.maBac = this.cookie.get("bac")
    this.hocKi = this.cookie.get("hocKi")
  }
  ///hien thi ds lop
  danhSachLop() {
    this.lopHocService.getAll().subscribe(
      dsLop => {
        this.dsLop = dsLop;

      },
      (error) => {
        console.log(error);
      }
    );
  }
  //danh Sach Sinh Vien
  danhSachSinhVien() {
    var phong: string = this.maLopHoc
    this.SinhVienService.tinhTongSinhVien(phong).subscribe(
      (dsSinhVien) => {
        this.dsSinhVien = dsSinhVien.siSo;
      },
      (error) => {
        console.log(error);
      }
    );


  }

  ///hien thi dsgv
  danhSachGV() {
    this.apiService.layDanhSachGiaoVien().subscribe(
      (dsGiaoVien) => {
        this.dsGiaoVien = dsGiaoVien;
      },
      (error) => {
        console.log(error);
      }
    );

  }

  // ds gv lớp hoc phần
  danhSachGVLHP() {
    this.gvlhpService.getall().subscribe(
      (dsGiaoVienLopHP) => {
        this.dsGiaoVienLopHP = dsGiaoVienLopHP;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //danh sách lớp giáo viên
  dsLopGiaoVien() {

    this.danhSachLop();
    this.maLopHocPhan = 55;
    this.lopHocPhanService.getLopHocPhanbyMaLopHocPhan(this.maLopHocPhan).subscribe(
      dsLopHP => {
        this.dsLopHP = dsLopHP;
         this.dsLopHP.forEach(x => {
          this.filterDsLop =this.dsLop.filter(y => {
            if (y.maLopHoc == x.maLopHoc && y.maBac ==this.maBac && y.khoa==this.maKhoa)
            return x;
          }) 
        })
        this.danhSachLopHocPhan()
      },
      (error) => {
        console.log(error)
      });

  }

  //hien thi ds lop hoc phan
  danhSachLopHocPhan() {
    this.layCookie();
    if (this.Doituong == 1) {
      this.maLopHoc = '30061711';
      this.lopHocPhanService.layLopHocPhantheoMaLop(this.maLopHoc).subscribe(
        dsLopHP => {
          this.dsLopHP = dsLopHP;
          this.filterDsLop = this.dsLopHP.filter(x => {
            if (x.hocKi == this.hocKi)
              return x;
          })
          this.danhSachLopHocPhan()
        },
        (error) => {
          console.log(error)
        });

    }
    else {
      this.dsLopGiaoVien();
    }
  }
  //hien thi danh sach danh sach lop

}