import { Component, OnInit } from '@angular/core';
import { DiemthiService } from '../../services/diemthi.service';
@Component({
  selector: 'app-page-tracuudiem',
  templateUrl: './page-tracuudiem.component.html',
  styleUrls: ['./page-tracuudiem.component.css']
})
export class PageTracuudiemComponent implements OnInit {

  constructor(private DiemthiService: DiemthiService) {}

  ngOnInit(): void {
  }
  DiemThi: any[];
  DiemThiTheoSBD: any[];
  mssv: any;
  masosinhvien: any;
  sobaodanh: any;
  tukhoatimkiemmssv: any;
  tukhoatimkiemsbd: any;
  alertnull:any;
  TraCuuDiem(mssv): void {
    if (mssv == '') {
      this.alertnull='Vui lòng nhập mã số sinh viên!';
    }
    else{
      if(mssv.length != 10){
        this.alertnull='Mã số sinh viên không đúng!';
      }
      else{
        this.DiemthiService.TraCuuDiem(mssv).subscribe((data) => {
          this.DiemThi = data;
          this.DiemThiTheoSBD = null;
          this.tukhoatimkiemmssv=mssv;
          this.alertnull=null;
        });
      }
    }
  }
  TraCuuDiemTheoSBD(sbd): void {
    if (sbd == '') {
      this.alertnull='Vui lòng nhập số báo danh!';
    }
    else{
      this.DiemthiService.TraCuuDiemTheoSBD(sbd).subscribe((data) => {
        this.DiemThiTheoSBD = data;
        this.DiemThi = null;
        this.tukhoatimkiemsbd=sbd;
      });
    }
  }
  traCuuTheoMssv(e){
    this.masosinhvien= e.target.checked;
    if (this.masosinhvien === true) {
      let value = false;
      this.sobaodanh= value;

    }
    else{
      let value = true;
      this.sobaodanh= value;
    }
    this.DiemThi=null;
    this.DiemThiTheoSBD=null;
    this.tukhoatimkiemmssv=null;
    this.tukhoatimkiemsbd=null;
  }
  traCuuTheoSBD(e){
    this.sobaodanh= e.target.checked;
    if (this.sobaodanh === true) {
      let value = false;
      this.masosinhvien= value;
    }
    else{
      let value = true;
      this.masosinhvien= value;
    }
    this.DiemThi=null;
    this.DiemThiTheoSBD=null;
    this.tukhoatimkiemmssv=null;
    this.tukhoatimkiemsbd=null;
  }
}
