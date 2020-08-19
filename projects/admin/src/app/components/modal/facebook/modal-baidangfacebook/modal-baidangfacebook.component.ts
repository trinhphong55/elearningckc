import { ToastrService } from 'ngx-toastr';
import { PagefbService } from './../../../../services/pagefb.service';
import { LoaifbService } from './../../../../services/loaifb.service';
import { LopHocService } from './../../../../services/lop-hoc.service';
import { TrangThaifbService } from './../../../../services/trangthaifb.service';
import { BaiDangfbService } from './../../../../services/baidangfb.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-modal-baidangfacebook',
  templateUrl: './modal-baidangfacebook.component.html',
  styleUrls: ['./modal-baidangfacebook.component.css'],
})
export class ModalBaidangfacebookComponent implements OnInit {
  data: any;
  trangthai: any;
  setTrangthai: any;
  mess:any;
  selectedCityIds:[null];
  selectedPgae:[null];
  layloaifb:any;
  getpg:any;
  waitTime = 0;
  _ListIndex:-1;
  _listidpage:[];
  conTentt:any;
  urlImg:any;
  getMaloai:any;
  getloaifb:any;
  tenpage:any;
  nofis:any;

  //Khai báo list
  public posttams: any;
  public addForm: FormGroup;
  constructor(
    private modalService: ModalService,
    private baiDangService: BaiDangfbService,
    private trangthaifbSV: TrangThaifbService,
    private lophocSV: LopHocService,
    private LoaiFB: LoaifbService,
    private pageSV:PagefbService,
    private toastr:ToastrService

  ) {}
  searchpage;
  lopHoc:any;
  ngOnInit(): void {
    this.addForm = new FormGroup({
      trangThai: new FormControl(''),
      theLoai: new FormControl(),
      getLoaisTT:new FormControl(),
      conTent:new FormControl(),
      urlimg:new FormControl(),
      getLoaisTTgrp:new FormControl(),
      conTentgrp:new FormControl(),
      urlimggrp:new FormControl(),
    });
    this.getAll();
    this.getTrangthai();
    this.changedTrangThai();
    this.getLopHoc();
    this.getLoaifb();
    this.getPage();

  }

  get getLoaisTT(){
    return this.addForm.get('getLoaisTT');
  }
  get conTent(){
    return this.addForm.get('conTent');
  }

  get urlimg(){
    return this.addForm.get('urlimg');
  }
  get getLoaisTTgrp(){
    return this.addForm.get('getLoaisTTgrp');
  }
  get conTentgrp(){
    return this.addForm.get('conTentgrp');
  }

  get urlimggrp(){
    return this.addForm.get('urlimggrp');
  }

  getAll() {
    this.baiDangService.getAll().subscribe((data) => {
      this.data = data;
      this.posttams = data;
    });
  }

  getPage(){
    this.pageSV.getAll().subscribe((getpg)=>{
      this.getpg = getpg;
    })
  }

  getLopHoc(){
    this.lophocSV.getAll().subscribe((lopHoc)=>{
      this.lopHoc = lopHoc;
    })
  }

  getLoaifb(){
    this.LoaiFB.getAll().subscribe((layloaifb)=>{
      this.layloaifb = layloaifb;
    })
  }

  getTrangthai(){
    this.trangthaifbSV.getAll().subscribe((trangthai) => {
      this.trangthai = trangthai;
    });
  }

  changeTrangthai(d){
    this.baiDangService.delete(d._id).subscribe((ress:any)=>{
      this.mess = ress.msg;
      alert(this.mess);
      console.log(ress);
      this.getAll();
    })
  }

  //bắt sự kiện show post theo trạng thái
  changedTrangThai() {
    this.posttams = [];
    if (this.addForm.value.trangThai !== '') {
      this.data.forEach((element) => {
        if (element.trangThai == this.addForm.value.trangThai) {
          this.posttams.push(element);
        }
      });
    } else {
      this.posttams = this.data;
    }
  }

  fixInput(){
    console.log(this.selectedCityIds);
    $('#listidgrp').val(this.selectedCityIds);

    this.delay(1000).then(any=>{
      var nofi = $('#returnloaigrp1').val();
        if(nofi !== '' || this.selectedCityIds == [null]){
          this.nofis = nofi;
          this.toastr.warning(this.nofis,'Nhắc nhở',{
            timeOut:2000,
            positionClass:'toast-bottom-right',
          });
        }else{
          var errpage = $('#returnerrorpicturegrp').val();
            this.nofis = errpage;
            if(errpage !== ''){
              this.toastr.warning(this.nofis,'Nhắc nhở',{
                timeOut:2000,
                positionClass:'toast-bottom-right',
              });
            }
            else{
              this.toastr.success('Cứ sau 20 giây sẽ có 1 trang được đăng bài','Thông báo',{
                timeOut:2000,
                positionClass:'toast-bottom-right',
              });
            }
        }
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  transIDpage(){
    $('#listidpage').val(this.selectedPgae);


    this.delay(1000).then(any=>{
      var nofi = $('#returnloaip1').val();
        if(nofi !== ''){
          this.nofis = nofi;
          this.toastr.warning(this.nofis,'Nhắc nhở',{
            timeOut:2000,
            positionClass:'toast-bottom-right',
          });
        }else{
            var errpage = $('#returnerrorpicturePage').val();
            this.nofis = errpage;
            if(errpage !== ''){
              this.toastr.warning(this.nofis,'Nhắc nhở',{
                timeOut:2000,
                positionClass:'toast-bottom-right',
              });
            }
            else{
              this.toastr.success('Cứ sau 20 giây sẽ có 1 trang được đăng bài','Thông báo',{
                timeOut:2000,
                positionClass:'toast-bottom-right',
              });
            }
        }
    });
  }

  insertTime(d){
    this.conTentt = this.addForm.value.conTent;
    this.urlImg = this.addForm.value.urlimg;
    let linkpost = $('#linkstt').val();
    let Post_idd = $('#postid').val();
    this.getloaifb = this.addForm.value.getLoaisTT;

    this.getpg.filter((item)=>{
      if(item.id_Page === d){
        this.tenpage = item.tenPage;
      }
    })
    this.layloaifb.filter((item)=>{
      if(item.loai === this.getloaifb){
        this.getMaloai = item.maLoai;
      }
    })
    console.log(this.conTentt);
    console.log(this.urlImg);
    console.log(this.tenpage);
    console.log(this.getloaifb);
    console.log(this.getMaloai);
    // console.log(linkpost);
    // console.log(Post_idd);

  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
