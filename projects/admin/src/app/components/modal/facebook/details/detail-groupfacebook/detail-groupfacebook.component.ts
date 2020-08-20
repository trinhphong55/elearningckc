import { TrangThaifbService } from './../../../../../services/trangthaifb.service';
import { BaiDangfbService } from './../../../../../services/baidangfb.service';
import { ChangeDetialFB } from './../../../../../services/changeDetailFB.service';
import { ModalService } from './../../../../../services/modal.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-groupfacebook',
  templateUrl: './detail-groupfacebook.component.html',
  styleUrls: ['./detail-groupfacebook.component.css']
})
export class DetailGroupfacebookComponent implements OnInit {

  search;
  titleFormGroup: string;
  baiDangtmp:any;
  data:any;
  gettt:any;

  constructor(
    private modalService: ModalService,
    private _changeDetailFB: ChangeDetialFB,
    private baiDangSv: BaiDangfbService,
    private trangthaiSV: TrangThaifbService,

  ) { }

  ngOnInit(): void {
    this.getTrangthai();
    this.getbaiDang();
    this._changeDetailFB.titleFromGroupFB$.subscribe(text =>this.titleFormGroup = text);
  }

  getbaiDang(){
    this.baiDangSv.getAll().subscribe((data)=>{
      this.data = data;
    })
  }

  getTrangthai(){
    this.trangthaiSV.getAll().subscribe((gettt)=>{
      this.gettt = gettt;
    })
  }

  selectBaiDangGrp(val){
    ////console.log(val);
    this.baiDangtmp = [];

    this.data.forEach(element => {
      if(element.ID == val && element.trangThai == 2){
        this.baiDangtmp.push(element);
      }
    });
    ////console.log(this.baiDangtmp);
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
