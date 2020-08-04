import { Component, OnInit } from '@angular/core';
import { MoigvComponent } from '../../components/content/pageMoinguoi/moigv/moigv.component';
import { MatDialog } from '@angular/material/dialog';
import { MoisvComponent } from '../../components/content/pageMoinguoi/moisv/moisv.component';
import { ApiService } from '../../../../../admin/src/app/services/api.service';
import { SinhVienService } from '../../../../../admin/src/app/services/sinh-vien.service';
import { GvlhpService } from '../../../../../admin/src/app/services/gvlhp.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-page-moinguoi',
  templateUrl: './page-moinguoi.component.html',
  styleUrls: ['./page-moinguoi.component.css']
})
export class PageMoinguoiComponent implements OnInit {

  dsGiaoVien: any;
  dsHocSinh: any;
  dsGiaoVienLopHP: any;
  constructor(public dialog: MatDialog,
    private apiService: ApiService,
    private sinhVienService: SinhVienService,
    private gvlhpService: GvlhpService) { }

  ngOnInit(): void {
    this.danhSachGiaoVien(),
      this.danhSachHocSinh();
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
      (dsGiaoVienLopHP) => {
        this.dsGiaoVienLopHP = dsGiaoVienLopHP;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //hien thị danh sach giao vien 
  danhSachGiaoVien() {
    this.apiService.layDanhSachGiaoVien().subscribe(

    )
  }
  //ds hoc sinh
  danhSachHocSinh() {
    this.sinhVienService.laysinhvien("123").subscribe(
      dsHocSinh => {
        this.dsHocSinh = dsHocSinh
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
