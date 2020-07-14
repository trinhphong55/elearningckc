import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-phanconggiangday',
  templateUrl: './modal-phanconggiangday.component.html',
  styleUrls: ['./modal-phanconggiangday.component.css']
})
export class ModalPhanconggiangdayComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
