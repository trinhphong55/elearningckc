import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-quanlyslideshowcntt',
  templateUrl: './modal-quanlyslideshowcntt.component.html',
  styleUrls: ['./modal-quanlyslideshowcntt.component.css']
})
export class ModalQuanlyslideshowcnttComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
}
