
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LopHocPhanService } from '../../../../../admin/src/app/services/lophocphan.service';
import { LopHocService } from '../../../../../admin/src/app/services/lop-hoc.service';
import { GvlhpService } from '../../../../../admin/src/app/services/gvlhp.service';
import { ApiService } from '../../../../../admin/src/app/services/api.service';
import { SinhVienService } from '../../../../../admin/src/app/services//sinh-vien.service';
import { CookieService } from 'ngx-cookie-service';
import { BaiTapService } from '../../services/bai-tap.service';
import { GVLHP } from '../../../../../admin/src/app/interfaces/gvlhp.interface'
import { from } from 'rxjs';
import { publish } from 'rxjs/operators';
@Component({
  selector: 'app-page-trangchu',
  templateUrl: './page-trangchu.component.html',
  styleUrls: ['./page-trangchu.component.css']
})
export class PageTrangchuComponent implements OnInit {
  Doituong: any;
  thongtin: any;
  dsLop: any;
  dsLopHP: any = [];
  maLopHoc: string;
  maLopHocPhan: any;
  filterDsLop: any;
  dsGiaoVien: any = [];
  dsGiaoVienLopHP: any;
  dsTenGv: any;
  dsGVLHP: any;
  dsSinhVien: any;
  maBac: any;
  hocKi: any = 1;
  maKhoa: any = 1;
  test: any
  maGiaoVien: string;
  dsGiaoVienBymaGv: any;
  dsBT:any;

  constructor(
    private lopHocPhanService: LopHocPhanService,
    private lopHocService: LopHocService,
    private gvlhpService: GvlhpService,
    private apiService: ApiService,
    private SinhVienService: SinhVienService,
    private cookie: CookieService,
    private BaiTapService:BaiTapService,
  ) {}

  ngOnInit(): void {
    this.danhSachLop();
    this.danhSachGV();
    this.danhSachLopHocPhan();
    this.danhSachSinhVien();
    this.layCookie();
    this.LaySachLopHocPhan();
    this.danhSachGVLHP();
    this.danhSachLopGV();
    this.filterDsLop;
    this.laydsBaiTap();

  }
  // lay cookie
  layCookie() {
    this.maKhoa = this.cookie.get("khoa")
    this.maBac = this.cookie.get("bac")
    this.hocKi = this.cookie.get("hocKi")
    this.Doituong = this.cookie.get("role");
    this.thongtin = this.cookie.get("email");
  }
  ///hien thi ds lop
  danhSachLop() {
    this.lopHocService.getAll().subscribe(
      dsLop => {
        this.dsLop = dsLop;
        setTimeout(this.danhSachLopGV(),1000)
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
  //danh sach lop hoc phan
  LaySachLopHocPhan() {

    this.lopHocPhanService.getLopHocPhan().subscribe(
      dsLopHP => {
        this.dsLopHP = dsLopHP
      },
      (error) => {
        console.log(error)
      });

  }
  //lay ds giao vien lop hp
  danhSachGVLHP() {
    this.gvlhpService.getall().subscribe(
      dsGVLHP => {
        this.dsGVLHP = dsGVLHP;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //lay ds giao vien
  danhSachGV() {
    this.apiService.layDanhSachGiaoVien().subscribe(
      dsTenGv => {
        this.dsTenGv = dsTenGv;

      },
      (error) => {
        console.log(error);
      }
    );
  }

  ///hien thi dsgv
  danhSachLopGV() {
    if (this.Doituong == 'GV') {
      try {
        this.thongtin = this.cookie.get("email");
        this.lopHocPhanService.getLopHocPhanbyemail(this.thongtin).subscribe(
          dsGiaoVienBymaGv => {
            this.dsGiaoVienBymaGv = dsGiaoVienBymaGv;
            this.filterDsLop = [];
            this.dsLop.forEach(lop => {
              this.dsGiaoVienBymaGv.find(p => {
                if (this.maBac != -1 || this.maKhoa != -1) {
                  if (p.maLopHoc == lop.maLopHoc && lop.maBac == this.maBac && lop.khoa == this.maKhoa)
                    this.filterDsLop.push(p)
                }
                else {
                  this.filterDsLop = []
                  this.filterDsLop = this.dsGiaoVienBymaGv
                }
              })

            });
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (error) {
        return error;
      }
    }
  }

  //hien thi ds lop hoc phan
  danhSachLopHocPhan() {
    this.layCookie();
    if (this.Doituong == 'SV') {
      this.lopHocPhanService.getLopHocPhanbyemailSinhvien(this.thongtin).subscribe(
        dsLopHP => {
          this.layCookie();
          this.dsLopHP = dsLopHP;
          this.filterDsLop = []
          this.filterDsLop = this.dsLopHP.filter(x => {
              if (x.hocKi == this.hocKi) {
                return x;
              }
            })
        },
        (error) => {
          console.log(error)
        });
    }
  }
  //lay ds bai tap
  laydsBaiTap()
  {
  }
  //hien thi danh sach danh sach lop
}
