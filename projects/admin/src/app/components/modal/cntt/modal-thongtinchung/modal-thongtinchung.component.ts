import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-thongtinchung',
  templateUrl: './modal-thongtinchung.component.html',
  styleUrls: ['./modal-thongtinchung.component.css'],
})
export class ModalThongtinchungComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  closeModal(id: string) {
    this.modalService.close(id);
  }

  logData(): void {
    // console.log('danh muc');
    // console.log(this.maDanhMuc);
    // console.log('loai bai viet');
    // console.log(this.loaiBaiViet);
    // console.log(this.tinTucForm.value);
  }
}
