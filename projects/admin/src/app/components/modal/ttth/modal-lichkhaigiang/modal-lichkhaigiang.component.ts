import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-lichkhaigiang',
  templateUrl: './modal-lichkhaigiang.component.html',
  styleUrls: ['./modal-lichkhaigiang.component.css']
})
export class ModalLichkhaigiangComponent implements OnInit {


  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }
}
