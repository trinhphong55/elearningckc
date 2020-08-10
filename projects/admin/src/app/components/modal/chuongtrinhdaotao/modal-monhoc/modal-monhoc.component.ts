import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

//Services
import { MonhocService } from '../../../../services/monhoc.service';
import { LoaimonhocService } from '../../../../services/loaimonhoc.service';

//Interfaces
import { MonHoc } from '../../../../interfaces/monhoc.interface';
import { LoaiMonHoc } from '../../../../interfaces/loaimonhoc.interface';

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
  selectedMonHoc: MonHoc;
  trangThai: number = 1;

  getMonHoc() {
    this.monhocService.getMonHocbyTrangThai(this.trangThai).subscribe(data => {
      this.dsMonHoc = data;
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

  importExcel() {
    this.modalService.close('ctdt_monhoc');
    this.modalService.open('ctdt_importexcelmonhoc');
  }

  postMonHoc() {
    if (this.selectedMonHoc.tenMonHoc.trim() === "") {
      alert('Oke fine, nhap thong tin mon hoc di ban ey');
      return;
    }
    this.monhocService.addMonHoc(this.selectedMonHoc).subscribe(status => {
      if (status.success) {
        alert(status.success);
        this.renewMonHoc();
        this.getMonHoc();
      } else {
        alert('them moi that bai');
        this.renewMonHoc();
      }
    });
  }

  updateMonHoc() {
    if (this.selectedMonHoc.maMonHoc === "") {
      alert('Chua chon mon hoc');
      return;
    }
    this.monhocService.updateMonHoc(this.selectedMonHoc).subscribe(res => {
      if (res.status === 200) {
        alert(res.message);
      } else {
        alert('Error: ' + res.message);
        this.renewMonHoc();
      }
    });
  }

  restoreMonHoc(maMonHoc: string) {
    this.customConfirm("Phuc hoi mon hoc nay?", () => {
      this.monhocService.setTrangThai(maMonHoc).subscribe(res => {
        if (res.status === 200) {
          this.getMonHoc();
          alert(res.message);
        } else {
          alert(res.message);
          this.renewMonHoc();
        }
      })
    })
  }

  deleteMonHoc(maMonHoc: string) {
    this.customConfirm("May co chac muon xoa mon hoc nay?", () => {
      this.monhocService.deleteMonHoc(maMonHoc).subscribe(res => {
        if (res.status === 200) {
          this.getMonHoc();
          alert(res.message);
        } else {
          alert('Error: ' + res.message);
        }
      });
    })
  }

  renewMonHoc() {
    this.selectedMonHoc = { maMonHoc: "", tenMonHoc: "", maLoaiMonHoc: "LT", tenVietTat: "" };
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

  closeModal(id: string) {
    this.modalService.close(id)
  }

  constructor(
    private modalService: ModalService,
    private monhocService: MonhocService,
    private loaimonhocService: LoaimonhocService,) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit(): void {
    this.getLoaiMonHoc();
    this.getMonHoc();
    this.renewMonHoc();
  }

}
