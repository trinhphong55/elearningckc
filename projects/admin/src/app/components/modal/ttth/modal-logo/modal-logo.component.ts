import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-logo',
  templateUrl: './modal-logo.component.html',
  styleUrls: ['./modal-logo.component.css']
})
export class ModalLogoComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
}
