import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-home-camon',
  templateUrl: './modal-home-camon.component.html',
  styleUrls: ['./modal-home-camon.component.css']
})
export class ModalHomeCamonComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }
}
