import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';


@Component({
  selector: 'app-modal-phonghoc',
  templateUrl: './modal-phonghoc.component.html',
  styleUrls: ['./modal-phonghoc.component.css']
})
export class ModalPhonghocComponent implements OnInit {

  selectedPhongHoc = {
    tenPhongHoc: "ten phong hoc",
    ghiChu: "ghi chu",
    day: "F",
    lau: "7",
  }

  dsDay = ["A", "B", "C", "D", "E", "F"];
  dsLau = [1, 2, 3, 4, 5, 6, 7];
  dsPhongHoc = [
    {
      maPhongHoc: "maPhongHoc",
      tenPhongHoc: "ten phong hoc",
      ghiChu: "ghi chu",
      day: "F",
      lau: "7",
    },

  ]

  searchPhongHoc: any;

  postPhongHoc() {
    alert('oke');
  }

  updatePhongHoc() {
    alert('oke');
  }

  getPhongHoc() {
    alert('oke');
  }

  renewPhongHoc() {
    alert('oke');
  }

  onSelect() {
    alert('oke');
  }

  deletePhongHoc() {
    alert('oke');
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

  constructor(
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
  }

}
