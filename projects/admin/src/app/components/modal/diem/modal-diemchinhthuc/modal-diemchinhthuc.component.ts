import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { FormGroup, FormControl } from '@angular/forms';

declare var $: any

@Component({
  selector: 'app-modal-diemchinhthuc',
  templateUrl: './modal-diemchinhthuc.component.html',
  styleUrls: ['./modal-diemchinhthuc.component.css']
})
export class ModalDiemchinhthucComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  loaiBaiVietForm = new FormGroup({
    hjhj: new FormControl(''),
    trangThai: new FormControl(''),
    khoa: new FormControl(16),
  });

  ngOnInit(): void {  }

  onSubmitSave() {
    this.loaiBaiVietForm.patchValue({
      hjhj: $("#abcdef").val()
    })
    console.log(this.loaiBaiVietForm.value)
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
