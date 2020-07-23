import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { GroupfbService } from '../../../../services/groupfb.service';

@Component({
  selector: 'app-modal-groupfacebook',
  templateUrl: './modal-groupfacebook.component.html',
  styleUrls: ['./modal-groupfacebook.component.css']
})
export class ModalGroupfacebookComponent implements OnInit {
  nganhs:any;
  constructor(private modalService: ModalService,private groupFBService: GroupfbService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.groupFBService.getAll().subscribe(
      data => {
        this.nganhs = data;
        console.log(this.nganhs);

      }
    );
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

}
