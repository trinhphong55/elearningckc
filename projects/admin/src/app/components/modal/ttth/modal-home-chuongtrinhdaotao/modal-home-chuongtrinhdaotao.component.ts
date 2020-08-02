import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-home-chuongtrinhdaotao',
  templateUrl: './modal-home-chuongtrinhdaotao.component.html',
  styleUrls: ['./modal-home-chuongtrinhdaotao.component.css']
})
export class ModalHomeChuongtrinhdaotaoComponent implements OnInit {
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
