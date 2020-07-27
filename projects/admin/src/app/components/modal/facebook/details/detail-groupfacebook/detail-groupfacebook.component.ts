import { ModalService } from './../../../../../services/modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-groupfacebook',
  templateUrl: './detail-groupfacebook.component.html',
  styleUrls: ['./detail-groupfacebook.component.css']
})
export class DetailGroupfacebookComponent implements OnInit {

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

}
