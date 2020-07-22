import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { MonhocService } from '../../../../services/monhoc.service';
import { MonHoc } from '../../../../interfaces/monhoc.interface';

@Component({
  selector: 'app-modal-monhoc',
  templateUrl: './modal-monhoc.component.html',
  styleUrls: ['./modal-monhoc.component.css'],
  providers: [MonhocService]
})
export class ModalMonhocComponent implements OnInit, OnChanges {

  searchMonHoc;

  dsMonHoc: MonHoc[];

  selectedMonHoc: MonHoc = { maMonHoc: "", tenMonHoc: "", loaiMonHoc: "Thực hành", tenTiengAnh: "", tenVietTat: "", tenVietTatTiengAnh: "" };

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
    // console.log(this.selectedMonHoc);
    this.monhocService.addMonHoc(this.selectedMonHoc).subscribe(status => {
      console.log("cua post" , status);
      if (status.success) {
        alert(status.success);
        this.selectedMonHoc = { maMonHoc: "", tenMonHoc: "", loaiMonHoc: "Thực hành", tenTiengAnh: "", tenVietTat: "", tenVietTatTiengAnh: "" };
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
    this.monhocService.deleteMonHoc(maMonHoc).subscribe(data => {
      console.log("deleted", data);
      this.monhocService.getMonHoc().subscribe(data => {
        this.dsMonHoc = data;
      })
    });
  }

  constructor(private modalService: ModalService, private monhocService: MonhocService) {
    monhocService.getMonHoc().subscribe(data => {
      this.dsMonHoc = data;
      // console.log(data);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit(): void {

  }

  closeModal(id: string) {
    this.modalService.close(id)
  }



}
