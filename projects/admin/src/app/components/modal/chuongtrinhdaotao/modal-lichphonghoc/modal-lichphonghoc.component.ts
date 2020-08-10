import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-lichphonghoc',
  templateUrl: './modal-lichphonghoc.component.html',
  styleUrls: ['./modal-lichphonghoc.component.css']
})
export class ModalLichphonghocComponent implements OnInit {

  closeModal(id: string) {
    this.modalService.close(id)
  }

  constructor(
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
  }

}
