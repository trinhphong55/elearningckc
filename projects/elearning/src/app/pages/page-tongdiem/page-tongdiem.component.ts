import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../../admin/src/app/services/api.service';
import { SinhVienService } from '../../../../../admin/src/app/services/sinh-vien.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { LopHocPhanService } from '../../../../../admin/src/app/services/lophocphan.service';
import { LopHocService } from '../../../../../admin/src/app/services/lop-hoc.service';
import { CotDiemLopHocPhanService } from '../../../../../admin/src/app/services/cotDiemLopHP.service';
import { chiTietDiemSVLopHocPhanService } from '../../../../../admin/src/app/services/chiTietDiemSVLHP.service';
import { GvlhpService } from '../../../../../admin/src/app/services/gvlhp.service';
import { DiemSinhVienService } from '../../../../../admin/src/app/services/diem-sinh-vien.service';
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-page-tongdiem',
  templateUrl: './page-tongdiem.component.html',
  styleUrls: ['./page-tongdiem.component.css']
})
export class PageTongdiemComponent implements OnInit {
  data: [][]
  dsHocSinh: any;
  maLophocPhan: any;
  dsTenHocSinh: any;
  dsLopHP: any;
  maLopHoc: any;
  soluong: any;
  cotDiemHP: any;
  ctDiem: any;
  dsGiaoVienhp: any;
  dsGiaoVienLophp: any;
  excel: any;
  luuDTK: any;
  constructor(public dialog: MatDialog,
    private sinhVienService: SinhVienService,
    private router: ActivatedRoute, private route: Router,
    private lopHocPhanService: LopHocPhanService,
    private lopHocService: LopHocService,
    private cookie: CookieService,
    private cotDiemLopHocPhanService: CotDiemLopHocPhanService,
    private chiTietDiemSVLopHocPhanService: chiTietDiemSVLopHocPhanService,
    private gvlhpService: GvlhpService,
    private diemSinhVienServiceL: DiemSinhVienService,
    private toastrService:ToastrService) { }

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
          }
        )
      }
    )
  }
  danhSachSinhVien() {
    this.diemSinhVienServiceL.layThongTinDiemSVByLHP(this.router.snapshot.paramMap.get('id')).subscribe(
      (dsTenHocSinh) => {
        this.dsTenHocSinh = dsTenHocSinh;
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
      },
      (error) => {
        console.log(error);
      }
    )
  }

  exPortExcel() {
    this.diemSinhVienServiceL.layThongTinDiemSVByLHP(this.router.snapshot.paramMap.get('id')).subscribe(
      (dsTenHocSinh) => {
        this.dsTenHocSinh = dsTenHocSinh;
        this.excel = [];
        this.dsTenHocSinh.filter(x => {
          this.excel.push({ HO: x.ho, ten: x.ten, masosinhvien: x.mssv, DTB: x.diemTongKet })
        })
        this.chiTietDiemSVLopHocPhanService.exportAsExcelFile(this.excel, "diemtongket")
      },
      (error) => {
        console.log(error);
      }
    )
  }
  luuDiem() {
    this.diemSinhVienServiceL.luuDiem(this.dsTenHocSinh, this.router.snapshot.paramMap.get('id')).subscribe(
      luuDTK => {
        if (luuDTK != "") {
          this.toastrService.success('Lưu bảng điểm thành công', ' thông báo', {
            timeOut:3000,
          });
        }
        else {
          this.toastrService.error('Bảng Điểm đã tồn tại', ' thông báo', {
            timeOut:3000,
          });
       }
      },
      (error) => {
        this.toastrService.error('Bảng Điểm đã tồn tại', ' thông báo', {
          timeOut:3000,
        });
        console.log(error);
      }
    )
  }
}
