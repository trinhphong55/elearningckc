import { BaiDangfbService } from './../../../../../services/baidangfb.service';
import { ChangeDetialFB } from './../../../../../services/changeDetailFB.service';
import { ModalService } from './../../../../../services/modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-pagefacebook',
  templateUrl: './detail-pagefacebook.component.html',
  styleUrls: ['./detail-pagefacebook.component.css']
})
export class DetailPagefacebookComponent implements OnInit {

  search;
  baiDang:any;
  titleFormPage: string;
  constructor(
    private modalService: ModalService,
    private _changeDetailFB: ChangeDetialFB,
    private baidangFBservice: BaiDangfbService
  ) { }

  ngOnInit(): void {
    this._changeDetailFB.titleFromPageFB$.subscribe(text =>this.titleFormPage = text);
    this.getBaiDang();
  }

  getBaiDang(){
    this.baidangFBservice.getAll().subscribe((baiDang)=>{
      this.baiDang = baiDang;
    })
  }

  getid(){
    var idP ;
    console.log($('#id_P').val());
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

}
