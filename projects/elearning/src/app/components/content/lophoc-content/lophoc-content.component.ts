import { Component, OnInit } from '@angular/core';
import { Lophoc } from './service-lophoc/lophoc';
import { FormControl } from '@angular/forms';
import { BacService } from '../../../../../../admin/src/app/services/Bac.service';
import { LopHocPhanService } from '../../../../../../admin/src/app/services/lophocphan.service';
import { LopHocService } from '../../../../../../admin/src/app/services/lop-hoc.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-lophoc-content',
  templateUrl: './lophoc-content.component.html',
  styleUrls: ['./lophoc-content.component.css']
})
export class LophocContentComponent implements OnInit {
  bac: any;
  lopHocPhan: any;
  lopHoc: any;
  maBac?: number = null;

  toppings = new FormControl();
  toppingList: string[] = ['học kì 1', 'học kì 2', 'học kì 3', 'học kì 4', 'học kì 5', 'học kì 6'];
  khoahocs = new FormControl();
  khoahocList: any = [
    { 'tenKhoa': 'khóa 17', 'maKhoa': '17' },
    { 'tenKhoa': 'khóa 18', 'maKhoa': '18' },
    { 'tenKhoa': 'khóa 19', 'maKhoa': '19' },
    { 'tenKhoa': 'khóa 20', 'maKhoa': '20' },];

  constructor(
    private http: HttpClient,
    private bacservice: BacService,
    private lopHocPhanService: LopHocPhanService,
    private lopHocService: LopHocService) { }
  ngOnInit(): void {
    this.getbac();
    this.LayDanhSachLopHocPhan();
    this.LayDanhSachLopHoc();
  }

  //lay danh sach bac
  getbac() {
    this.bacservice.getBac().subscribe(
      (bac) => {
        this.bac = bac;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  //lay danh sach lop hoc phan
  LayDanhSachLopHocPhan() {
    this.lopHocPhanService.getLopHocPhan().subscribe(
      (lopHocPhan) => {
        this.lopHocPhan = lopHocPhan;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //laydanhsachlophoc
  LayDanhSachLopHoc() {
    this.lopHocService.getAll().subscribe(
      (lopHoc) => {
        this.lopHoc = lopHoc;
        console.log(this.lopHocPhan)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  test() {
    alert(this.maBac);
  }
}


