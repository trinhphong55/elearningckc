import { Component, OnInit } from '@angular/core';
import {MoigvComponent} from '../../components/content/pageMoinguoi/moigv/moigv.component';
import { MatDialog } from '@angular/material/dialog';
import { MoisvComponent } from '../../components/content/pageMoinguoi/moisv/moisv.component';
import { ApiService } from '../../../../../admin/src/app/services/api.service';
import { SinhVienService } from '../../../../../admin/src/app/services/sinh-vien.service';
import { GvlhpService } from '../../../../../admin/src/app/services/gvlhp.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { from } from 'rxjs';


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
  dsTenGiaoVien: any;
  constructor(public dialog: MatDialog,
    private apiService: ApiService,
    private sinhVienService: SinhVienService,
    private gvlhpService: GvlhpService,
    private router: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.danhSachGiaoVien(),
      // this.danhSachHocSinh();
      this.maLophocPhan = this.router.snapshot.paramMap.get('id');
  }
  openMoigv() {
    this.dialog.open(MoigvComponent, { width: '400px' });
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
      this.dsGiaoVienLophp.forEach(y => {
        this.dsTenGiaoVien =this.dsGiaoVien.filter(x => {
            if (y.maGiaoVien == x.maGiaoVien)
              console.log(x);
              return y
          });
        });
         console.log(this.dsTenGiaoVien)
        // console.log(this.dsGiaoVien)
      },
      (error) => {
        console.log(error);
      }
    );
  }
 


  //ds hoc sinh
  // danhSachHocSinh() {
  //   this.sinhVienService.laysinhvien("123").subscribe(
  //     dsHocSinh => {
  //       this.dsHocSinh = dsHocSinh
  //     },
  //     (error)=>{
  //       console.log(error);
  //     }
  //   )
  // }
}
