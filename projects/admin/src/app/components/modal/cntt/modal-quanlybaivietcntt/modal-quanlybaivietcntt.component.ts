import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { cnttBaiVietService } from '../../../../services/cntt/tintuc-cntt.service'

@Component({
  selector: 'app-modal-quanlybaivietcntt',
  templateUrl: './modal-quanlybaivietcntt.component.html',
  styleUrls: ['./modal-quanlybaivietcntt.component.css']
})
export class ModalQuanlybaivietcnttComponent implements OnInit {

  TinTuc: any = [];

  constructor(private modalService: ModalService, private cnttBaiVietService: cnttBaiVietService) {
    this.loadDanhSachTinTuc()
  }

  ngOnInit(): void {
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
  openModal(id: string) {
    this.modalService.open(id)
  }
  
  loadDanhSachTinTuc() {
    this.cnttBaiVietService.danhSachTinTuc().subscribe((data) => {
      this.TinTuc = data;
    })
  }
}
