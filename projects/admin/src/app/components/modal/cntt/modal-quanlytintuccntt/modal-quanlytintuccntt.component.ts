import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-quanlytintuccntt',
  templateUrl: './modal-quanlytintuccntt.component.html',
  styleUrls: ['./modal-quanlytintuccntt.component.css']
})
export class ModalQuanlytintuccnttComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
  openModal(id: string) {
    this.modalService.open(id)
  }
}
