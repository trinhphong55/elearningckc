import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

import { PhonghocService } from '../../../../services/phonghoc.service';
import { PhongHoc } from '../../../../interfaces/PhongHoc.interface';


@Component({
  selector: 'app-modal-phonghoc',
  templateUrl: './modal-phonghoc.component.html',
  styleUrls: ['./modal-phonghoc.component.css']
})
export class ModalPhonghocComponent implements OnInit {

  selectedPhongHoc: PhongHoc = {
    tenPhongHoc: "F7. ",
    ghiChu: "",
    day: "F",
    lau: 7,
  }

  dsDay = ["A", "B", "C", "D", "E", "F"];
  dsPhongHoc: PhongHoc[];

  searchPhongHoc;

  postPhongHoc() {
    if (this.selectedPhongHoc.tenPhongHoc.trim() === "") {
      alert('Nhap ten phong hoc');
      return;
    }
    this._phongHocService.addPhongHoc(this.selectedPhongHoc).subscribe(
      res => {
        if (res.status === 200) {
          alert(res.message);
          this.changeDayorLau();
          this.getPhongHoc();
        }
        else {
          alert('Error: ' + res.message);
        }
      },
      error => console.log(error)
    )
  }

  updatePhongHoc() {
    alert('oke');
  }

  getPhongHoc() {
    this._phongHocService.getTatCaPhongHoc().subscribe(
      dsph => this.dsPhongHoc = dsph,
      error => console.log(error)
    )
  }

  renewPhongHoc() {
    alert('oke');
  }

  changeDayorLau() {
    this.selectedPhongHoc.tenPhongHoc = `${this.selectedPhongHoc.day}${this.selectedPhongHoc.lau}. `;
  }

  onSelect(maPH: number): void {
    this._phongHocService.getOnePhongHoc(maPH).subscribe(onePH => {
      this.selectedPhongHoc = onePH;
    })
  }

  deletePhongHoc() {
    alert('oke');
  }

  closeModal(id: string) {
    this._modalService.close(id)
  }

  constructor(
    private _modalService: ModalService,
    private _phongHocService: PhonghocService,
  ) { }

  ngOnInit(): void {
    this.getPhongHoc();
  }

}
