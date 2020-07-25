import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoaidonviService } from './../../../../services/loaidonvi/loaidonvi.service';
import { KhoaBonmonService } from './../../../../services/khoa-bomons/khoa-bonmon.service';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { Khoabomon } from '../../../../interfaces/Khoabomon.interface';
import { ModalService } from '../../../../services/modal.service';
import {BomonService} from './../../../../services/khoa-bomons/bomon.service';
@Component({
  selector: 'app-modal-import-excel-khoabomon',
  templateUrl: './modal-import-excel-khoabomon.component.html',
  styleUrls: ['./modal-import-excel-khoabomon.component.css']
})
export class ModalImportExcelKhoabomonComponent implements OnInit {

  spinnerEnabled = false;
  keys: string[];
  dsKhoabomon: Khoabomon[];
  dataSheet = new Subject;
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;

  //thêm file excel lên
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
        this.dsKhoabomon = data;
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
  //import
  importExcel() {
    this.dsKhoabomon.forEach( async Khoabomons=>{
      console.log(Khoabomons);
      if(Khoabomons.maLoai==1){
       
      this.KhoaBonmonService.create(Khoabomons).subscribe(
        (response) => {
       
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );}
      else{
        this.BomonService.create(Khoabomons).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    })
    
    this.modalService.close('ctdt_khoabomon');
    this.modalService.close('ctdt_importexcelkhoabomon');
    this.modalService.open('ctdt_khoabomon');
  }

  constructor(  private loaiDonviService: LoaidonviService,
    private modalService: ModalService,
    private KhoaBonmonService: KhoaBonmonService,
    private BomonService: BomonService) { }

    
    //làm trống thẻ input
    removeData() {
      this.inputFile.nativeElement.value = '';
      this.dataSheet.next(null);
      this.keys = null;
      this.dsKhoabomon = undefined;
    }
  
  ngOnInit(): void {
  }
  closeModal(id: string) {
    this.modalService.close(id);
    this.modalService.open('ctdt_khoabomon');
  }
}
