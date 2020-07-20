import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-quanlyfootercntt',
  templateUrl: './modal-quanlyfootercntt.component.html',
  styleUrls: ['./modal-quanlyfootercntt.component.css']
})
export class ModalQuanlyfootercnttComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
}
