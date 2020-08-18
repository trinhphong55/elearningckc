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
  selectedCityIds:[];
  selectedPgae:any[];
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
  mss1:any;
  mss:any;
  mslink:any;

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
    private toastr:ToastrService,
    private baiDangFBService: BaiDangfbService,


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
      mslinkpage:new FormControl(),
      getLoaisTTgrp:new FormControl(),
      conTentgrp:new FormControl(),
      urlimggrp:new FormControl(),
      mslinkgroup:new FormControl(),
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
  get mslinkpage(){
    return this.addForm.get('mslinkpage');
  }
  get mslinkgroup(){
    return this.addForm.get('mslinkgroup');
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
    console.log(this.selectedPgae);

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

  insertdartbdgage(){
    this.conTentt = this.addForm.value.conTent;
    this.urlImg = this.addForm.value.urlimg;
    this.getloaifb = this.addForm.value.getLoaisTT;
    this.mslink = this.addForm.value.mslinkpage;


    console.log(this.conTentt);
    console.log(this.urlImg);
    console.log(this.getloaifb);

    console.log(this.selectedPgae);
    if(this.conTentt === '' || this.getloaifb == 'null'|| this.selectedPgae==null|| this.selectedPgae.length==0||this.conTentt ==null){
       this.toastr.warning('Không được để trống Nội dung và Loại bài viết','Nhắc nhở',{
         timeOut:2000,
         positionClass:'toast-bottom-right',
       });
    }else{
      this.layloaifb.filter((item)=>{
        if(item.loai === this.getloaifb){
          this.getMaloai = item.maLoai;
        }
      });
      console.log(this.getMaloai);
      this.selectedPgae.forEach(d => {
        this.getpg.filter((item)=>{
          if(item.id_Page === d){
            this.tenpage = item.tenPage;
          }
        })
      console.log(this.tenpage);
      this.baiDangFBService.createDraw({
        ID: d,
        message: this.conTentt + this.mslink,
        url: this.urlImg,
        maLoai: this.getMaloai,
        loai: this.getloaifb,
        thuoc: this.tenpage,
        postOf: 'page'
      }).subscribe((ress:any)=>{
        this.mss = ress.msg;
        this.mss1 = ress.msg1;
        if(this.mss1){
          this.toastr.success(this.mss1,'Thông báo',{
            timeOut:2000,
            positionClass:'toast-bottom-right',
          });
        }
        if(this.mss){
          this.toastr.error(this.mss,'Lỗi',{
            timeOut:2000,
            positionClass:'toast-bottom-right',
          });
        }
        console.log(ress);
      })


      });
      this.delay(1000).then(any=>{

        this.conTent.setValue('');
        this.getLoaisTT.setValue('');
        this.urlimg.setValue('');
      });
    }



    // console.log(linkpost);
    // console.log(Post_idd);

  }

  insertdartbdgrp(){
    this.conTentt = this.addForm.value.conTentgrp;
    this.urlImg = this.addForm.value.urlimggrp;
    this.getloaifb = this.addForm.value.getLoaisTTgrp;
    this.mslink = this.addForm.value.mslinkgroup;


    console.log(this.conTentt);
    console.log(this.urlImg);
    console.log(this.getloaifb);

    console.log(this.selectedCityIds);
    if(this.conTentt === '' || this.getloaifb == 'null'|| this.selectedCityIds==null|| this.selectedCityIds.length==0||this.conTentt ==null){
       this.toastr.warning('Không được để trống Nội dung và Loại bài viết','Nhắc nhở',{
         timeOut:2000,
         positionClass:'toast-bottom-right',
       });
    }else{
      this.layloaifb.filter((item)=>{
        if(item.loai === this.getloaifb){
          this.getMaloai = item.maLoai;
        }
      });
      console.log(this.getMaloai);
      this.selectedCityIds.forEach(d => {
        this.getpg.filter((item)=>{
          if(item.IDGroupFB === d){
            this.tenpage = item.tenGroupFB;
          }
        })
      console.log(this.tenpage);
      this.baiDangFBService.createDraw({
        ID: d,
        message: this.conTentt + this.mslink,
        url: this.urlImg,
        maLoai: this.getMaloai,
        loai: this.getloaifb,
        thuoc: this.tenpage,
        postOf: 'group'
      }).subscribe((ress:any)=>{
        this.mss = ress.msg;
        this.mss1 = ress.msg1;
        if(this.mss1){
          this.toastr.success(this.mss1,'Thông báo',{
            timeOut:2000,
            positionClass:'toast-bottom-right',
          });
        }
        if(this.mss){
          this.toastr.error(this.mss,'Lỗi',{
            timeOut:2000,
            positionClass:'toast-bottom-right',
          });
        }
        console.log(ress);
      })


      });
      this.delay(1000).then(any=>{

        this.conTentgrp.setValue('');
        this.getLoaisTTgrp.setValue('');
        this.urlimggrp.setValue('');
      });
    }



    // console.log(linkpost);
    // console.log(Post_idd);

  }

  capnhatchuadang(){
    console.log('cập nhật chưa đăng');
  }

  capnhatdadang(){
    console.log('cập nhật đã đăng');
  }

  updatedadang(){

  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
