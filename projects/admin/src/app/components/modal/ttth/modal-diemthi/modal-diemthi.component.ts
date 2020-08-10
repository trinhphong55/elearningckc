import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { DiemthiService } from '../../../../services/ttth/diemthi.service';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { ttthDiemThi } from '../../../../../models/ttthDiemThi';import { exit } from 'process';
;
@Component({
  selector: 'app-modal-diemthi',
  templateUrl: './modal-diemthi.component.html',
  styleUrls: ['./modal-diemthi.component.css']
})
export class ModalDiemthiComponent implements OnInit {

  constructor(private modalService: ModalService,private DiemthiService: DiemthiService,private toastr: ToastrService) { }
  spinnerEnabled = false;
  keys: string[];
  DiemThi : ttthDiemThi[];
  dataSheet = new Subject;
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalService.close(id)
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
    this.DiemthiService.importDiemThi(this.DiemThi).subscribe(data => { this.DiemThi.push(data);
      console.log(this.DiemThi);
    });
    this.toastr.success('Import thành công');

  }
}
