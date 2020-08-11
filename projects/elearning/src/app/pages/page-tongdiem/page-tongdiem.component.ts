import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { MoisvComponent } from '../../components/content/pageMoinguoi/moisv/moisv.component';
import { ApiService } from '../../../../../admin/src/app/services/api.service';
import { SinhVienService } from '../../../../../admin/src/app/services/sinh-vien.service';
import { GvlhpService } from '../../../../../admin/src/app/services/gvlhp.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { LopHocPhanService } from '../../../../../admin/src/app/services/lophocphan.service';
import { LopHocService } from '../../../../../admin/src/app/services/lop-hoc.service';
import { CotDiemLopHocPhanService } from '../../../../../admin/src/app/services/cotDiemLopHP.service';
import { chiTietDiemSVLopHocPhanService } from '../../../../../admin/src/app/services/chiTietDiemSVLHP.service';
import { from } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-page-tongdiem',
  templateUrl: './page-tongdiem.component.html',
  styleUrls: ['./page-tongdiem.component.css']
})
export class PageTongdiemComponent implements OnInit {
  data: [][]
  dsGiaoVien: any;
  dsHocSinh: any;
  dsGiaoVienhp: any;
  maLophocPhan: any;
  dsGiaoVienLophp: any;
  dsTenHocSinh: any;
  dsLopHP: any;
  maLopHoc: any;
  soluong: any;
  cotDiemHP: any;
  ctDiem: any;
  constructor(public dialog: MatDialog,
    private apiService: ApiService,
    private sinhVienService: SinhVienService,
    private gvlhpService: GvlhpService,
    private router: ActivatedRoute, private route: Router,
    private lopHocPhanService: LopHocPhanService,
    private lopHocService: LopHocService,
    private cookie: CookieService,
    private cotDiemLopHocPhanService: CotDiemLopHocPhanService,
    private chiTietDiemSVLopHocPhanService: chiTietDiemSVLopHocPhanService) { }

  ngOnInit(): void {
    this.danhSachSinhVien();
    this.danhSachCotDiemLopHP();
    this.chiTietDiemSinhVien();
    this.maLophocPhan = this.router.snapshot.paramMap.get('id');
  }
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
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Không mở được file');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      console.log(ws);
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data[0]);
    };
    reader.readAsBinaryString(target.files[0]);
  }


  //ds lop hoc phan
  danhSachSinhVien() {
    this.sinhVienService.layDsSvByLopHP(this.router.snapshot.paramMap.get('id')).subscribe(
      (dsTenHocSinh) => {
        this.dsTenHocSinh = dsTenHocSinh
      },

      (error) => {
        console.log(error);
      }
    )
  }
  ////
  danhSachCotDiemLopHP() {
    this.cotDiemLopHocPhanService.layCotDiemByMaLopHP(this.router.snapshot.paramMap.get('id')).subscribe(
      cotDiemHP => {
        this.cotDiemHP = cotDiemHP;
        console.log(cotDiemHP)
      },
      (error) => {
        console.log(error);
      }
    )
  }
  ///chi tiết diem sinh vien lop hp
  chiTietDiemSinhVien() {
    this.chiTietDiemSVLopHocPhanService.layCotDiemByMaLopHP(this.router.snapshot.paramMap.get('id')).subscribe(
      ctDiem => {
        this.ctDiem = ctDiem;
        console.log(ctDiem)
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
