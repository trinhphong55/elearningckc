import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../../admin/src/app/services/api.service';
import { SinhVienService } from '../../../../../admin/src/app/services/sinh-vien.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { LopHocPhanService } from '../../../../../admin/src/app/services/lophocphan.service';
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
  constructor(public dialog: MatDialog,
    private sinhVienService: SinhVienService,
    private router: ActivatedRoute, private route: Router,
    private lopHocPhanService: LopHocPhanService,) { }

  ngOnInit(): void {
      this.danhSachLopHocPhan();
    this.maLophocPhan = this.router.snapshot.paramMap.get('id');
  }
  onFileChange(evt : any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if(target.files.length!==1) throw new Error ('Không mở được file');
    const reader: FileReader = new FileReader();
    reader.onload=(e: any)=>{
      const bstr:string = e.target.result;
      const wb:XLSX.WorkBook =XLSX.read(bstr,{type:'binary'});
      const wsname:string=wb.SheetNames[0];
      const ws:XLSX.WorkSheet=wb.Sheets[wsname];
      console.log(ws);
      this.data=(XLSX.utils.sheet_to_json(ws,{header:1}));
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
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
