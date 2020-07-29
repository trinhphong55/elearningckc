import { LopHocService } from './../../../../services/lop-hoc.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { GroupfbService } from '../../../../services/groupfb.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
import { BacService } from '../../../../services/Bac.service';

@Component({
  selector: 'app-modal-groupfacebook',
  templateUrl: './modal-groupfacebook.component.html',
  styleUrls: ['./modal-groupfacebook.component.css'],
})
export class ModalGroupfacebookComponent implements OnInit {
  data: any;
  bac: any;
  nganhs: any;
  lop: any;
  constructor(
    private modalService: ModalService,
    private groupFBService: GroupfbService,
    private nganhngheservice: NganhNgheService,
    private bacservice: BacService,
    private lopService: LopHocService
  ) {}
  searchGroup;
  ngOnInit(): void {
    this.getAll();
    this.getNganh();
    this.getbac();
    this.getLop();
    this.openDetail();

  }

  getAll() {
    this.groupFBService.getAll().subscribe( 
      data=> {
      this.data = data;
      console.log(this.data);
    });
  }

  getbac() {
    this.bacservice.getBac().subscribe(
      (bac) => {
        this.bac = bac;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getNganh() {
    this.nganhngheservice.getNgangnghe().subscribe(
      (nganhs) => {
        this.nganhs = nganhs;
      },
      (error) => {
        console.log(error);
      }
    );
    return this.data;
  }

  getLop() {
    this.lopService.getAll().subscribe((lop) => {
      this.lop = lop;
      console.log(lop);
    });
  }

  openDetail() {
    this.modalService.open('detail-groupfb');
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
