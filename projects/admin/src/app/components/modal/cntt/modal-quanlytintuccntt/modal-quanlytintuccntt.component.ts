import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { TintucCnttService } from '../../../../services/cntt/tintuc-cntt.service'

@Component({
  selector: 'app-modal-quanlytintuccntt',
  templateUrl: './modal-quanlytintuccntt.component.html',
  styleUrls: ['./modal-quanlytintuccntt.component.css']
})
export class ModalQuanlytintuccnttComponent implements OnInit {
  TinTuc: any = [];

  constructor(private modalService: ModalService, private tintucCnttService: TintucCnttService) {
    this.loadDanhSachTinTuc()
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
  openModal(id: string) {
    this.modalService.open(id)
  }
  ngOnInit(): void {
  }
  loadDanhSachTinTuc() {
    this.tintucCnttService.danhSachTinTuc().subscribe((data) => {
      this.TinTuc = data;
    })
  }
}
