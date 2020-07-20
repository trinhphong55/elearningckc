import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-dangkikhoahoc',
  templateUrl: './modal-dangkikhoahoc.component.html',
  styleUrls: ['./modal-dangkikhoahoc.component.css']
})
export class ModalDangkikhoahocComponent implements OnInit {
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }
}
