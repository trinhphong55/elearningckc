import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-lienhe',
  templateUrl: './modal-lienhe.component.html',
  styleUrls: ['./modal-lienhe.component.css']
})
export class ModalLienheComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
