import { distinctUntilChanged } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PagefbService } from './../../../../services/pagefb.service';
import { LoaifbService } from './../../../../services/loaifb.service';
import { LopHocService } from './../../../../services/lop-hoc.service';
import { TrangThaifbService } from './../../../../services/trangthaifb.service';
import { BaiDangfbService } from './../../../../services/baidangfb.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { TintucCnttService } from '../../../../services/cntt/tintuc-cntt.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
  news:any;
  getidpage:any;
  mslast:any;
  public Editor = ClassicEditor;

  testContent = "";

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
    private tintuc: TintucCnttService,


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
    this.getDanhSachBaiViet();

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
  getDanhSachBaiViet(){
    this.tintuc.danhSachTinTucAPI().subscribe(res=>{
      this.news = res.data;
    })
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
    this.baiDangService.deleteDraw(d._id).subscribe((ress:any)=>{
      this.mess = ress.msg;
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
    this.conTentt = this.addForm.value.conTent;
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

    if(this.conTentt === '' || this.getloaifb == 'null'|| this.selectedPgae==null|| this.selectedPgae.length==0||(this.conTentt ==null && this.urlImg==null)|| this.getloaifb == null){
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
      this.selectedPgae.forEach(d => {
        this.getpg.filter((item)=>{
          if(item.id_Page === d){
            this.tenpage = item.tenPage;
          }
        })
        if(this.mslink==null||this.mslink=='null'){
          this.baiDangFBService.createDraw({
            ID: d,
            message: this.conTentt,
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
          });
        }else{
          if(this.conTentt == null||this.conTentt=='null'||this.conTentt==''){
            this.baiDangFBService.createDraw({
              ID: d,
              message:this.mslink,
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
  
            });
          }else{
            this.baiDangFBService.createDraw({
              ID: d,
              message: this.conTentt +','+ this.mslink,
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
  
            });
          }
          
        }
      });
      this.delay(1000).then(any=>{

        this.conTent.setValue('');
        this.getLoaisTT.setValue(null);
        this.urlimg.setValue('');
        this.getAll();
      });
    }





  }

  insertdartbdgrp(){
    this.conTentt = this.addForm.value.conTentgrp;
    this.urlImg = this.addForm.value.urlimggrp;
    this.getloaifb = this.addForm.value.getLoaisTTgrp;
    this.mslink = this.addForm.value.mslinkgroup;
    //console.log(this.selectedCityIds);

    if((this.conTentt===''||this.conTentt == null) &&this.urlImg==null|| this.getloaifb == 'null'|| this.selectedCityIds==null|| this.selectedCityIds.length==0||this.getloaifb == null){
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
      this.selectedCityIds.forEach(d => {
        this.lopHoc.filter((item)=>{
          if(item.IDGroupFB === d){
            this.tenpage = item.tenGroupFB;
          }
        });
        //console.log(this.tenpage);
        if(this.mslink==null||this.mslink=='null'){
          this.baiDangFBService.createDraw({
            ID: d,
            message: this.conTentt,
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
          });
        }else{
          if(this.conTentt == null||this.conTentt=='null'||this.conTentt==''){
            //console.log(this.getMaloai);
            //console.log(this.tenpage);
            //console.log(d);
            //console.log(this.mslink);

            this.baiDangFBService.createDraw({
              ID: d,
              message:this.mslink,
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
  
            });
          }else{
            this.baiDangFBService.createDraw({
              ID: d,
              message: this.conTentt +','+ this.mslink,
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
  
            });
          }
          
        }
      });
      this.delay(1000).then(any=>{

        this.conTentgrp.setValue('');
        this.getLoaisTTgrp.setValue(null);
        this.urlimggrp.setValue('');
        this.getAll();
      });
    }
  }

  capnhatchuadang(){

  }

  capnhatdadang(){

  }

  dangbai(d){

    this.getidpage = d._id;

    this.data.forEach(dt => {
      if(dt._id == this.getidpage){

        let arr = dt.message.split(',');

        $('#message').val(arr[0]);
        $('#mslinkp1').val(arr[1]);
        $('#picture').val(dt.url);
        $('#loaip2').val(dt.loai);

      }
    });
    this.delay(3000).then(any=>{
      let linkpost = $('#linkstt').val();
      let Post_idd = $('#postid').val();

      var errpage = $('#returnerrorpicturePage').val();
            if(errpage !== ''){
              var err:any = errpage;
              this.toastr.warning(err,'Nhắc nhở',{
                timeOut:2000,
                positionClass:'toast-bottom-right',
              });
            }
            else{
              this.toastr.success('Đăng bài thành công!','Thông báo',{
                timeOut:2000,
                positionClass:'toast-bottom-right',
              });
              this.baiDangService.updateDrawtoPosted(d._id,{
                postID: Post_idd,
                link: linkpost
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

              });
              this.getAll();
            }

    });
  }

  dangbaigrp(d){

    this.getidpage = d._id;

    this.data.forEach(dt => {
      if(dt._id == this.getidpage){
        let arr = dt.message.split(',');

        $('#messagegr').val(arr[0]);
        $('#mslinkgrp1').val(arr[1]);
        $('#picturegr').val(dt.url);
        $('#loaig2').val(dt.loai);



      }
    });
    this.delay(3000).then(any=>{
      let linkpost = $('#linkstGrp').val();
      let Post_idd = $('#postidGrp').val();

      var errpage = $('#returnerrorpicturegrp').val();
            if(errpage !== ''){
              var err:any = errpage;
              this.toastr.warning(err,'Nhắc nhở',{
                timeOut:2000,
                positionClass:'toast-bottom-right',
              });
            }
            else{
              this.toastr.success('Đăng bài thành công!','Thông báo',{
                timeOut:2000,
                positionClass:'toast-bottom-right',
              });
              this.baiDangService.updateDrawtoPosted(d._id,{
                postID: Post_idd,
                link: linkpost
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

              });
              this.getAll();
            }

    });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
