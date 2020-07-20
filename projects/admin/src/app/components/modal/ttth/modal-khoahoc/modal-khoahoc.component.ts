import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-khoahoc',
  templateUrl: './modal-khoahoc.component.html',
  styleUrls: ['./modal-khoahoc.component.css']
})
export class ModalKhoahocComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
