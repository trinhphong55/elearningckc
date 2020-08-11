import { Component, OnInit } from '@angular/core';
import { MoigvComponent } from '../../components/content/pageMoinguoi/moigv/moigv.component';
import { MatDialog } from '@angular/material/dialog';
import { MoisvComponent } from '../../components/content/pageMoinguoi/moisv/moisv.component';
import { ApiService } from '../../../../../admin/src/app/services/api.service';
import { SinhVienService } from '../../../../../admin/src/app/services/sinh-vien.service';
import { GvlhpService } from '../../../../../admin/src/app/services/gvlhp.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { LopHocPhanService } from '../../../../../admin/src/app/services/lophocphan.service';
import { LopHocService } from '../../../../../admin/src/app/services/lop-hoc.service';
import { from } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-page-moinguoi',
  templateUrl: './page-moinguoi.component.html',
  styleUrls: ['./page-moinguoi.component.css']
})
export class PageMoinguoiComponent implements OnInit {

  dsGiaoVien: any;
  dsHocSinh: any;
  dsGiaoVienhp: any;
  maLophocPhan: any;
  dsGiaoVienLophp: any;
  dsTenHocSinh: any;
  dsLopHP: any;
  maLopHoc: any;
  soluong:any;
  quyen:string="";
  doiTuong:any;
  constructor(public dialog: MatDialog,
    private apiService: ApiService,
    private sinhVienService: SinhVienService,
    private gvlhpService: GvlhpService,
    private router: ActivatedRoute, private route: Router,
    private lopHocPhanService: LopHocPhanService,
    private lopHocService: LopHocService,
    private cookie:CookieService) { }

  ngOnInit(): void {
    this.danhSachGiaoVien(),
      this.danhSachLopHocPhan();
    this.danhSachHocSinh();
    this.moiGiaoVien();
    this.quyenMoi();
    this.maLophocPhan = this.router.snapshot.paramMap.get('id');
  }
  openMoigv() {
    this.dialog.open(MoigvComponent, { width: '400px' });
    this.cookie.set("maLophocPhan",this.maLophocPhan)
  }
  openMoisv() {
    this.dialog.open(MoisvComponent, { width: '400px' });
  }
  //
  danhSachGVLHP() {
    this.gvlhpService.getall().subscribe(
      dsGiaoVienhp => {
        this.dsGiaoVienhp = dsGiaoVienhp;
        this.dsGiaoVienLophp = this.dsGiaoVienhp.filter(x => {
          if (x.maLopHocPhan == this.maLophocPhan)
            return x;
        })
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //hien thị danh sach giao vien 
  danhSachGiaoVien() {
    this.danhSachGVLHP();
    this.apiService.layDanhSachGiaoVien().subscribe(
      dsGiaoVien => {
        this.dsGiaoVien = dsGiaoVien;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  //ds lop hoc phan
  danhSachLopHocPhan() {
    this.lopHocPhanService.getLopHocPhan().subscribe(
      dsLopHP => {
        this.dsLopHP = dsLopHP
        this.dsLopHP = this.dsLopHP.filter(x => {
          if (x.maLopHocPhan == this.maLophocPhan)
            this.maLopHoc = x.maLopHoc;
          return x;
        })
        this.sinhVienService.laysinhvien(this.maLopHoc).subscribe(
          dsHocSinh => {
            this.dsHocSinh = dsHocSinh;
            this.soluong=this.dsHocSinh.length;
          }
        )
      },
      (error) => {
        console.log(error);
      }
    )
  }

  //ds hoc sinh
  danhSachHocSinh() {
  }

  //moi giao vien
  moiGiaoVien(){

  }

  //quyen moigv
  quyenMoi()
  {
  
    this.doiTuong = this.cookie.get("role");
    if(this.doiTuong== 'SV')
    {
      this.quyen='none'
    }
  }
}
