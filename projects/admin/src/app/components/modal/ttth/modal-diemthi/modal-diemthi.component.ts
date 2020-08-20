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
import { exit } from 'process';


@Component({
  selector: 'app-modal-diemthi',
  templateUrl: './modal-diemthi.component.html',
  styleUrls: ['./modal-diemthi.component.css']
})
export class ModalDiemthiComponent implements OnInit {

  constructor(private modalService: ModalService,private DiemthiService: DiemthiService,private DotthiService: DotthiService,private LophocService: LophocService,private toastr: ToastrService) { }
  spinnerEnabled = false;
  keys: string[];
  DiemThi : ttthDiemThi[];
  DotThi : any[];
  selectDotThi: any;
  private _username: any = getCookie('name');
  dataSheet = new Subject;
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  ngOnInit(): void {
    this.getdanhsachdotthi();
  }
  getdanhsachdotthi(): void {
    this.DotthiService.get().subscribe((data) => {this.DotThi = data;  setTimeout(() => {}, 500);});
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
  onChangeDotThi(value) {
    this.selectDotThi=value;
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
  importExcel() {
    let ngaythi: any;
    let giothi: any;
    let phongthi: any;
    let tendotthi: any;
    let dotthi = this.selectDotThi;
    let nguoitao = this._username;
    this.DotThi.forEach(function (value) {
      if (dotthi==value._id) {
        ngaythi = value.ngaythi;
        giothi = value.giothi;
        phongthi = value.phongthi;
        tendotthi = value.tendot+'-'+value.ngaythi+'-'+value.giothi+'-'+value.phongthi;
      }
    });
    let kiemtradiem : any ;
    this.DiemThi.forEach(function (value) {
      value.tendotthi = tendotthi;
      value.id = dotthi;
      value.ngaythi = ngaythi;
      value.giothi = giothi;
      value.phongthi = phongthi;
      value.nguoitao = nguoitao;
      value.loaidiem = 'Điểm thi';
      if(isNaN(+value.tongdiem) || value.tongdiem < 0 || value.tongdiem > 100
      || isNaN(+value.laptrinhc) || value.laptrinhc < 0 || value.laptrinhc > 20
      || isNaN(+value.msword) || value.msword < 0 || value.msword > 30
      || isNaN(+value.msexcel) || value.msexcel < 0 || value.msexcel > 30
      || isNaN(+value.mspowerpoint) || value.mspowerpoint < 0 || value.mspowerpoint > 20
      ){
        kiemtradiem=false;
      }
    });
    if (kiemtradiem==false) {
      this.toastr.error('Vui lòng kiểm tra lại điểm nhập vào');
    }
    else{
      this.DiemthiService.importDiemThi(this.DiemThi).subscribe(data => { this.DiemThi.push(data);});
      this.toastr.success('Nhập điểm đợt thi thành công');
      this.DiemThi=null;
      this.getdanhsachdotthi();
    }
  }
}
