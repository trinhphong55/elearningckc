import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ModalService } from '../../../../../services/modal.service';
import { MonhocService } from '../../../../../services/monhoc.service';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { MonHoc } from '../../../../../interfaces/monhoc.interface';

@Component({
  selector: 'app-modal-import-excel-monhoc',
  templateUrl: './modal-import-excel-monhoc.component.html',
  styleUrls: ['./modal-import-excel-monhoc.component.css'],
  providers: [MonhocService]
})
export class ModalImportExcelMonhocComponent implements OnInit, OnChanges {

  spinnerEnabled = false;
  keys: string[];
  dsMonHoc: MonHoc[];
  dataSheet = new Subject;
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;

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
        this.dsMonHoc = data;
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        this.spinnerEnabled = false;
        this.keys = Object.keys(data[0]);
        // console.log(this.dsMonHoc);
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
    this.dsMonHoc = undefined;
  }

  importExcel() {
    this.monhocService.importMonHocFromExcel(this.dsMonHoc).subscribe(status => {
      if (status.success) {
        alert(status.success);
      } else {
        if (status.error) {
          alert('them moi that bai, ' + status.error);
        } else {
          alert('them moi that bai')
        }
      }
    });
  }


  constructor(private modalService: ModalService, private monhocService: MonhocService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges run', { changes });
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
