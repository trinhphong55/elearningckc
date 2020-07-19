import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-home-tienich',
  templateUrl: './modal-home-tienich.component.html',
  styleUrls: ['./modal-home-tienich.component.css']
})
export class ModalHomeTienichComponent implements OnInit {
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }
}
