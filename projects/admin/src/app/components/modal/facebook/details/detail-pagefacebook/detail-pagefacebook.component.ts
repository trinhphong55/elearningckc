import { ModalService } from './../../../../../services/modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-pagefacebook',
  templateUrl: './detail-pagefacebook.component.html',
  styleUrls: ['./detail-pagefacebook.component.css']
})
export class DetailPagefacebookComponent implements OnInit {

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

}
