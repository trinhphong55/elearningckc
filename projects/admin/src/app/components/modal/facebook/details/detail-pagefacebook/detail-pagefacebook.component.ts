import { TrangThaifbService } from './../../../../../services/trangthaifb.service';
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
  data:any;
  titleFormPage: string;
  baiDangtmp: any;
  getIDPage: any;
  gettrangThai:any;
  constructor(
    private modalService: ModalService,
    private _changeDetailFB: ChangeDetialFB,
    private baidangFBservice: BaiDangfbService,
    private trangthaiFB: TrangThaifbService
  ) { }

  ngOnInit(): void {
    this._changeDetailFB.titleFromPageFB$.subscribe(text =>this.titleFormPage = text);
    this.getBaiDang();
    this.getTrangThai();
  }

  getBaiDang(){
    this.baidangFBservice.getAll().subscribe((data)=>{
      this.data = data;
    })
  }

  getTrangThai(){
    this.trangthaiFB.getAll().subscribe((gettrangThai)=>{
      this.gettrangThai = gettrangThai;
    })
  }

  selectBaiDang(val){
    //console.log(val);
    this.baiDangtmp = [];
    this.data.forEach(element => {
      if(element.ID == val && element.trangThai == 2){
        this.baiDangtmp.push(element);
      }
    });
    //console.log(this.baiDangtmp);
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
