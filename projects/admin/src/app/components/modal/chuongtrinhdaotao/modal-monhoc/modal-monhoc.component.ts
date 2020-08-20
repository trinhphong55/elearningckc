import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import saveAs from 'file-saver';


//Services
import { MonhocService } from '../../../../services/monhoc.service';
import { LoaimonhocService } from '../../../../services/loaimonhoc.service';


//Interfaces
import { MonHoc } from '../../../../interfaces/monhoc.interface';
import { LoaiMonHoc } from '../../../../interfaces/loaimonhoc.interface';
import { FileService } from '../../../../services/file.service';

@Component({
  selector: 'app-modal-monhoc',
  templateUrl: './modal-monhoc.component.html',
  styleUrls: ['./modal-monhoc.component.css'],
  providers: [MonhocService, LoaimonhocService]
})
export class ModalMonhocComponent implements OnInit, OnChanges {

  searchMonHoc;
  dsMonHoc: MonHoc[];
  dsLoaiMonHoc: LoaiMonHoc[];
  selectedMonHoc: MonHoc = { maMonHoc: "", maLoaiMonHoc: "LT", tenMonHoc: "", tenVietTat: "" };
  newMonHoc: MonHoc = { maMonHoc: "", maLoaiMonHoc: "LT", tenMonHoc: "", tenVietTat: "" };
  trangThai: number = 1;
  importedExcel = false;

  //Import Excel variables
  spinnerEnabled = false;
  keys: string[];
  dsMonHocfromExcel: MonHoc[];
  dataSheet = new Subject;
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;

  getMonHoc() {
    this.monhocService.getMonHocbyTrangThai(this.trangThai).subscribe(res => {
      if (res.status === 200) {
        this.dsMonHoc = res.data;
      } else {
        this.dsMonHoc = [];
      }
    });
  }

  getLoaiMonHoc() {
    this.loaimonhocService.getLoaiMonHoc().subscribe(dslmh => {
      this.dsLoaiMonHoc = dslmh;
    });
  }

  onSelect(maMonHoc: string): void {
    this.monhocService.getMonHocFromMaMonHoc(maMonHoc).subscribe(selectedMonHoc => {
      this.selectedMonHoc = selectedMonHoc;
    });
  }

  postMonHoc() {
    if (this.newMonHoc.tenMonHoc.trim() === "") {
      this.toastr.error("Quên nhập tên môn học kìa!!", 'Lỗi', { timeOut: 3000 });
      return;
    }
    this.monhocService.addMonHoc(this.newMonHoc).subscribe(res => {
      if (res.status === 200) {
        this.toastr.success("Thêm thành công", 'Thông báo', { timeOut: 3000 });
        this.renewMonHoc();
        this.getMonHoc();
      } else {
        this.toastr.error("Đã xảy ra lỗi:" + res.message, 'Lỗi: ' + res.status, { timeOut: 3000 });
        this.renewMonHoc();
      }
    });
  }

  updateMonHoc() {
    if (this.selectedMonHoc.tenMonHoc.trim() === "") {
      this.toastr.error("Quên nhập tên môn học kìa!!", 'Lỗi', { timeOut: 2000 });
      return;
    }
    this.monhocService.updateMonHoc(this.selectedMonHoc).subscribe(res => {
      if (res.status === 200) {
        this.toastr.success("Cập nhật thành công", 'Thông báo', { timeOut: 3000 });
        this.getMonHoc();
      } else {
        this.toastr.error("Đã xảy ra lỗi:" + res.message, 'Lỗi: ' + res.status, { timeOut: 3000 });
        this.renewMonHoc();
      }
    });
  }

  restoreMonHoc(maMonHoc: string) {
    this.customConfirm("Phục hồi môn học này?", () => {
      this.monhocService.setTrangThai(maMonHoc).subscribe(res => {
        if (res.status === 200) {
          this.getMonHoc();
          this.toastr.success("Phục hồi thành công", 'Thông báo', { timeOut: 3000 });
        } else {
          this.toastr.error("Đã xảy ra lỗi, code: " + res.status, 'Lỗi', { timeOut: 2000 });
          this.renewMonHoc();
        }
      })
    })
  }

  deleteMonHoc(maMonHoc: string) {
    this.customConfirm("Ban co chac muon xoa mon hoc nay?", () => {
      this.monhocService.deleteMonHoc(maMonHoc).subscribe(res => {
        if (res.status === 200) {
          this.getMonHoc();
          this.toastr.success("Xóa môn học thành công", 'Thông báo', { timeOut: 3000 });
        } else {
          this.toastr.error("Đã xảy ra lỗi, code: " + res.status, 'Lỗi', { timeOut: 2000 });
        }
      });
    })
  }

  renewMonHoc() {
    this.newMonHoc = { maMonHoc: "", tenMonHoc: "", maLoaiMonHoc: "LT", tenVietTat: "" };
  }

  changeTrangThai() {
    this.getMonHoc();
    this.renewMonHoc();
  }

  customConfirm(message: string, oke: Function) {
    let a = confirm(message);
    if (a) {
      oke();
    } else {
      return;
    }
  }

  downloadTemplate() {
    this.fileService.downloadFile("templateImportExcelMonHoc.xlsx")
      .subscribe(
        data => saveAs(data, "Mẫu Import Excel Môn học 2020.xlsx"),
        error => console.error(error)
      );
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
        this.dsMonHocfromExcel = data;
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
    this.dsMonHocfromExcel = undefined;
    this.importedExcel = false;
  }

  importExcel() {
    let itemExcel = this.dsMonHocfromExcel[0];
    if (!itemExcel.tenMonHoc || !itemExcel.tenVietTat || !itemExcel.loaiMonHoc) {
      this.toastr.error("File Excel không đúng mẫu, tải file mẫu phía trên để xem chi tiết: ", 'Lỗi', { timeOut: 3000 });
    } else {
      this.monhocService.importMonHocFromExcel(this.dsMonHocfromExcel).subscribe(res => {
        if (res.status === 200) {
          this.getMonHoc();
          this.toastr.success(res.message, 'Thông báo', { timeOut: 3000 });
        } else {
          this.toastr.error(res.message, 'Lỗi', { timeOut: 3000 });
        }
        this.importedExcel = true;
        this.dsMonHocfromExcel = res.data;
        console.log(this.dsMonHocfromExcel);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('OnChanges run', { changes });
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

  constructor(
    private toastr: ToastrService,
    private fileService: FileService,
    private modalService: ModalService,
    private monhocService: MonhocService,
    private loaimonhocService: LoaimonhocService,
  ) {
  }

  ngOnInit(): void {
    this.getLoaiMonHoc();
    this.getMonHoc();
    this.renewMonHoc();
  }

}
