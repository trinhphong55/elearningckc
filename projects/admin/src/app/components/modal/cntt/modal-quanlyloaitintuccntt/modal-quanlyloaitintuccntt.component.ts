import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-quanlyloaitintuccntt',
  templateUrl: './modal-quanlyloaitintuccntt.component.html',
  styleUrls: ['./modal-quanlyloaitintuccntt.component.css']
})
export class ModalQuanlyloaitintuccnttComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
}
