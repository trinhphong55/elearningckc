import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { DiemthiService } from '../../../../services/ttth/diemthi.service';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { ttthDiemThi } from '../../../../../models/ttthDiemThi';
import { DotthiService } from '../../../../services/ttth/dotthi.service';
import { LophocService } from '../../../../services/ttth/lophoc.service';
import { getCookie } from '../../../../../../../common/helper';
import { KhoahocService } from '../../../../services/ttth/khoahoc.service';

@Component({
  selector: 'app-modal-nhapdiemlophoc',
  templateUrl: './modal-nhapdiemlophoc.component.html',
  styleUrls: ['./modal-nhapdiemlophoc.component.css']
})
export class ModalNhapdiemlophocComponent implements OnInit {
  constructor(private modalService: ModalService,private DiemthiService: DiemthiService,private DotthiService: DotthiService,private LophocService: LophocService,private KhoahocService: KhoahocService,private toastr: ToastrService) { }
  spinnerEnabled = false;
  keys: string[];
  DiemThi : ttthDiemThi[];
  LopHoc : any[];
  KhoaHoc : any[];
  selectLopHoc: any;
  private _username: any = getCookie('name');
  dataSheet = new Subject;
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  ngOnInit(): void {
    this.getdanhsachlophoc();
    this.getdanhsachkhoahoc();
  }
  getdanhsachlophoc(): void {
    this.LophocService.getfilter().subscribe((data) => {this.LopHoc = data ;setTimeout(() => {}, 500);});
  }
  getdanhsachkhoahoc(): void {
    this.KhoahocService.get().subscribe((data) => {this.KhoaHoc = data;setTimeout(() => {}, 500);});
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
  onChangeLopHoc(value) {
    this.selectLopHoc=value;
  }
  onChange(evt) {
    let data;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
        this.DiemThi = data;
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        this.spinnerEnabled = false;
        this.keys = Object.keys(data[0]);
        this.dataSheet.next(data);
      }
    } else {
      this.inputFile.nativeElement.value = '';
    }
  }
  removeData() {
    this.inputFile.nativeElement.value = '';
    this.dataSheet.next(null);
    this.keys = null;
    this.DiemThi = undefined;
  }
  checkboxLopHocRieng: any;
  checkboxKhoaHoc: any;

  getValueCheckBoxLopHocRieng(e){
    this.checkboxLopHocRieng= e.target.checked;
    if (this.checkboxLopHocRieng === true) {
      let value = false;
      this.checkboxKhoaHoc= value;
    }
    else{
      let value = true;
      this.checkboxKhoaHoc= value;
    }
  }
  getValueCheckBoxKhoaHoc(e){
    this.checkboxKhoaHoc= e.target.checked;
    if (this.checkboxKhoaHoc === true) {
      let value = false;
      this.checkboxLopHocRieng= value;
    }
    else{
      let value = true;
      this.checkboxLopHocRieng= value;
    }
    this.selectLopHoc=null;
  }
  importExcel() {
    let kiemtradiem : any ;
    let kiemtramssv : any ;
    let nguoitao = this._username;
    if(this.selectLopHoc==null){
      let nguoitao = this._username;
      this.DiemThi.forEach(function (value) {
        value.nguoitao = nguoitao;
        value.loaidiem = 'Điểm lớp học';
        if(isNaN(+value.tongdiem) || value.tongdiem < 0 || value.tongdiem > 10){
          kiemtradiem=false;
        }
        if(isNaN(+value.mssv) || value.mssv.length !=10 || value.mssv.substr(0, 1) != '0'){
          kiemtramssv=false;
        }
      });
    }
    else{
      let lop = this.selectLopHoc;
      this.DiemThi.forEach(function (value) {
        value.lop = lop;
        value.nguoitao = nguoitao;
        value.loaidiem = 'Điểm lớp học';
        if(isNaN(+value.tongdiem) || value.tongdiem < 0 || value.tongdiem > 10){
          kiemtradiem=false;
        }
        if(isNaN(+value.mssv) || value.mssv.length !=10 || value.mssv.substr(0, 1) != '0'){
          kiemtramssv=false;
        }
      });
    }

    if (kiemtradiem==false) {
      this.toastr.error('Vui lòng kiểm tra lại điểm nhập vào');
    }
    else if (kiemtramssv==false) {
      this.toastr.error('Mã số sinh viên không đúng định dạng. Vui long kiểm tra lại');
    }
    else{
      this.DiemthiService.importDiemThi(this.DiemThi).subscribe(data => { this.DiemThi.push(data);});
      this.toastr.success('Nhập điểm lớp học thành công');
      this.DiemThi=null;
      this.getdanhsachlophoc();
    }
  }
}
