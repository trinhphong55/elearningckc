import { BaiDangfbService } from './../../../../services/baidangfb.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-baidangfacebook',
  templateUrl: './modal-baidangfacebook.component.html',
  styleUrls: ['./modal-baidangfacebook.component.css']
})
export class ModalBaidangfacebookComponent implements OnInit {

  data:any;
  constructor(
    private modalService: ModalService,
    private baiDangService: BaiDangfbService
    ) { }
  searchpage;
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.baiDangService.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
