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

  getMonHoc() {
    this.monhocService.getMonHoc().subscribe(data => {
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
    this.monhocService.updateMonHoc(this.selectedMonHoc).subscribe(status => {
      if (status.success) {
        alert('Cap nhat thanh cong');
        this.getMonHoc();
      } else {
        alert('Cap nhat that bai');
        this.renewMonHoc();
      }
    });
  }

  deleteMonHoc(maMonHoc: string) {
    this.monhocService.deleteMonHoc(maMonHoc).subscribe(status => {
      if (status.error) {
        alert(status.error);
      } else {
        this.getMonHoc();
      }
    });
  }

  renewMonHoc() {
    this.selectedMonHoc = { maMonHoc: "", tenMonHoc: "", maLoaiMonHoc: "LT", tenTiengAnh: "", tenVietTat: "", tenVietTatTiengAnh: "" };
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
