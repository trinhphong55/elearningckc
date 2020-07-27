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
  selectedMonHoc: MonHoc = { maMonHoc: "", tenMonHoc: "", maLoaiMonHoc: "LT", tenTiengAnh: "", tenVietTat: "", tenVietTatTiengAnh: "" };

  onSelect(maMonHoc: string): void {
    this.monhocService.getMonHocFromMaMonHoc(maMonHoc).subscribe(selectedMonHoc => {
      this.selectedMonHoc = selectedMonHoc;
      console.log(this.selectedMonHoc);
    });
  }

  importExcel() {
    this.modalService.close('ctdt_monhoc');
    this.modalService.open('ctdt_importexcelmonhoc');
  }

  postMonHoc() {
    // console.log(this.selectedMonHoc);
    this.monhocService.addMonHoc(this.selectedMonHoc).subscribe(status => {
      console.log("cua post" , status);
      if (status.success) {
        alert(status.success);
        this.selectedMonHoc = { maMonHoc: "", tenMonHoc: "", maLoaiMonHoc: "LT", tenTiengAnh: "", tenVietTat: "", tenVietTatTiengAnh: "" };
        this.monhocService.getMonHoc().subscribe(data => {
          this.dsMonHoc = data;
        })
      } else {
        alert('them moi that bai')
      }

    });
  }

  updateMonHoc() {
    this.monhocService.updateMonHoc(this.selectedMonHoc).subscribe(status => {
      console.log("cua save" , status);
      if (status.success) {
        alert('Cap nhat thanh cong');
        this.monhocService.getMonHoc().subscribe(data => {
          this.dsMonHoc = data;
        })
      } else {
        alert('Cap nhat that bai');
      }

    });
  }

  deleteMonHoc(maMonHoc: string) {
    this.monhocService.deleteMonHoc(maMonHoc).subscribe(status => {
      // console.log("deleted", status);
      if (status.error) {
        alert(status.error);
      } else {
        this.monhocService.getMonHoc().subscribe(data => {
          this.dsMonHoc = data;
        })
      }
    });
  }

  reloadDSMH() {
    this.monhocService.getMonHoc().subscribe(data => {
      this.dsMonHoc = data;
    })
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
    this.loaimonhocService.getLoaiMonHoc().subscribe(dslmh => {
      this.dsLoaiMonHoc = dslmh;
    });
    this.monhocService.getMonHoc().subscribe(data => {
      this.dsMonHoc = data;
    });
  }

}
