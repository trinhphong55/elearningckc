import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-quanlypartner',
  templateUrl: './modal-quanlypartner.component.html',
  styleUrls: ['./modal-quanlypartner.component.css']
})
export class ModalQuanlypartnerComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
}
