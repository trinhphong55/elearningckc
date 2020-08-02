import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { GroupfbService } from '../../../../services/groupfb.service';

@Component({
  selector: 'app-modal-groupfacebook',
  templateUrl: './modal-groupfacebook.component.html',
  styleUrls: ['./modal-groupfacebook.component.css']
})
export class ModalGroupfacebookComponent implements OnInit {
  data:any;
  constructor(private modalService: ModalService,private groupFBService: GroupfbService) { }
  searchGroup;
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.groupFBService.getAll().subscribe(
      data => {
        this.data = data;
        console.log(this.data);
      }
    );
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

}
