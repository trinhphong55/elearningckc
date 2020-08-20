import { TintucCnttService } from './../../../../services/cntt/tintuc-cntt.service';
import { DetailPagefacebookComponent } from './../details/detail-pagefacebook/detail-pagefacebook.component';
import { ChangeDetialFB } from './../../../../services/changeDetailFB.service';
import { TrangThaifbService } from './../../../../services/trangthaifb.service';
import { LoaifbService } from './../../../../services/loaifb.service';
import { BaiDangfbService } from './../../../../services/baidangfb.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PagefbService } from './../../../../services/pagefb.service';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-pagefacebook',
  templateUrl: './modal-pagefacebook.component.html',
  styleUrls: ['./modal-pagefacebook.component.css'],
})
export class ModalPagefacebookComponent implements OnInit {
  @ViewChild(DetailPagefacebookComponent) myDetail: DetailPagefacebookComponent;
  searchpage;
  data: any;
  datatmp: any;
  mess: any;
  mess1: any;
  mess2: any;
  mess3: any;
  addForm: FormGroup;
  getloai: any;
  gettt: any;
  idPage: any;
  loaistt: any;
  idpage: any;
  messa: any;
  urlImg: any;
  MaLoai: any;
  tenpage: any;
  text: '';
  getidss: any;
  mss1:any;
  nofis:any;
  mslinkp1:any;
  news:any;
  constructor(
    private modalService: ModalService,
    private pageFBService: PagefbService,
    private baiDangFBService: BaiDangfbService,
    private loaifbService: LoaifbService,
    private trangthaiFBService: TrangThaifbService,
    private _changeDetailFB: ChangeDetialFB,
    private toastr: ToastrService,
    private tintuc: TintucCnttService

  ) {}

  AfterViewInit;
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.getAll();
    this.getLoai();
    this. getDanhSachBaiViet();
    this.addForm = new FormGroup({
      tenPage: new FormControl(),
      IDpage: new FormControl(),
      linkPage: new FormControl(),
      getLoaistt: new FormControl(),
      getURLimg: new FormControl(),
      getMessage: new FormControl(),
      mslinkp:new FormControl(),
    });
  }
  get tenPage() {
    return this.addForm.get('tenPage');
  }
  get IDpage() {
    return this.addForm.get('IDpage');
  }
  get linkPage() {
    return this.addForm.get('linkPage');
  }
  get getLoaistt() {
    return this.addForm.get('getLoaistt');
  }
  get getURLimg() {
    return this.addForm.get('getURLimg');
  }

  get getMessage() {
    return this.addForm.get('getMessage');
  }

  get mslinkp() {
    return this.addForm.get('mslinkp');
  }
  getAll() {
    this.pageFBService.getAll().subscribe((data) => {
      this.data = data;
    });
  }
  getDanhSachBaiViet(){
    this.tintuc.danhSachTinTucAPI().subscribe(res=>{
      this.news = res.data;
    })
  }

  selectRow(data) {
    this.datatmp = data;
    this.tenPage.setValue(data.tenPage);
    this.IDpage.setValue(data.id_Page);
    this.linkPage.setValue(data.linkPage);
    this.getAll();
  }

  Insert() {
    this.pageFBService
      .create({
        tenPage: this.addForm.value.tenPage,
        id_Page: this.addForm.value.IDpage,
        linkPage: this.addForm.value.linkPage,
      })
      .subscribe((ress: any) => {
        this.mess=ress.msg;
        this.mess1 = ress.msg1;
        this.mess2 = ress.msg2;
        this.mess3 = ress.msg3;
        if(this.mess){
          this.toastr.warning(this.mess, 'Nhắc nhở', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
          });
        }
        if(this.mess1){
          this.toastr.warning(this.mess1, 'Nhắc nhở', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
          });
        }
        if(this.mess2){
          this.toastr.success(this.mess2, 'Thông báo', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
          });
        }
        if(this.mess3){
          this.toastr.warning(this.mess3, 'Nhắc nhở', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
          });
        }



        //console.log(ress);
        this.getAll();
      });
  }

  UpdatePage() {
    try {
      this.pageFBService
        .update(this.datatmp._id, {
          tenPage: this.addForm.value.tenPage,
          id_Page: this.addForm.value.IDpage,
          linkPage: this.addForm.value.linkPage,
        })
        .subscribe((ress: any) => {
          this.mess = ress.msg;
          this.toastr.info(this.mess, 'Thông báo', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
          });
          //console.log(ress);
          this.getAll();
        });
    } catch (err) {
      this.mess = 'Không được để trống các trường!!';
      this.toastr.warning(this.mess, 'Nhắc nhở', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
      });
    }
  }

  DeletePage(d) {
    this.pageFBService.delete(d._id).subscribe((ress: any) => {
      this.mess = ress.msg;
      this.toastr.success(this.mess, 'Thông báo ', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
      });
      //console.log(ress);
      this.getAll();
    });
  }

  getLoai() {
    this.loaifbService.getAll().subscribe((getloai) => {
      this.getloai = getloai;
    });
  }

  getTrangThai() {
    this.trangthaiFBService.getAll().subscribe((gettt) => {
      this.gettt = gettt;
      //console.log(this.gettt);
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  insertTobd() {
    this.delay(1500).then((any) => {
      //your task after delay.
      this.loaistt = this.addForm.value.getLoaistt;
      this.idpage = $('#getidpage').val();
      this.messa = this.addForm.value.getMessage;
      this.urlImg = this.addForm.value.getURLimg;
      this.mslinkp1 = this.addForm.value.mslinkp;
      this.data.filter((item) => {
        if (item.id_Page === this.idpage) {
          this.tenpage = item.tenPage;
        }
      });

      let linkpost = $('#linkstt').val();
      let Post_idd = $('#postid').val();
      ////console.log(linkpost);
      ////console.log(Post_idd);
      //console.log(this.idpage);
      //console.log(this.loaistt);
      //console.log(this.messa);
      //console.log(this.urlImg);
      //console.log(this.tenpage);

      this.delay(500).then(any=>{
        var nofi = $('#returnloaip2').val();
          if(nofi !== '' ||this.loaistt == null||this.messa==""){
            this.nofis = nofi;
            this.toastr.warning(this.nofis,'Nhắc nhở',{
              timeOut:2000,
              positionClass:'toast-bottom-right',
            });
          }else{
            var errpage = $('#returnerrorpicturePage').val();
            if(errpage !== ''){
              alert(errpage);
            }
            else{
              this.toastr.success('Đăng bài thành công!','Thông báo',{
                timeOut:2000,
                positionClass:'toast-bottom-right',
              });
              this.getloai.filter((item) => {
                if (item.loai === this.loaistt) {
                  this.MaLoai = item.maLoai;
                }
              });
              if(this.mslinkp1==null||this.mslinkp1=='null'){
                this.baiDangFBService
              .create({
                ID: this.idpage,
                postID: Post_idd,
                link: linkpost,
                message: this.messa,
                url: this.urlImg,
                maLoai: this.MaLoai,
                loai: this.loaistt,
                thuoc: this.tenpage,
                postOf: 'page'
              })
              .subscribe((ress: any) => {
                this.mess = ress.msg;
                this.mss1 = ress.msg1;
                if(this.mss1){
                  this.toastr.success(this.mss1,'Thông báo',{
                    timeOut:2000,
                    positionClass:'toast-bottom-right',
                  });
                }else{
                  this.toastr.error(this.mess,'Lỗi',{
                    timeOut:2000,
                    positionClass:'toast-bottom-right',
                  });
                }
              });
              }else{
                if(this.messa == null||this.messa=='null'||this.messa==''){
                  this.baiDangFBService
                  .create({
                    ID: this.idpage,
                    postID: Post_idd,
                    link: linkpost,
                    message: this.mslinkp1,
                    url: this.urlImg,
                    maLoai: this.MaLoai,
                    loai: this.loaistt,
                    thuoc: this.tenpage,
                    postOf: 'page'
                  })
                  .subscribe((ress: any) => {
                    this.mess = ress.msg;
                    this.mss1 = ress.msg1;
                    if(this.mss1){
                      this.toastr.success(this.mss1,'Thông báo',{
                        timeOut:2000,
                        positionClass:'toast-bottom-right',
                      });
                    }else{
                      this.toastr.error(this.mess,'Lỗi',{
                        timeOut:2000,
                        positionClass:'toast-bottom-right',
                      });
                    }
                  });
                }else{
                  this.baiDangFBService
                  .create({
                    ID: this.idpage,
                    postID: Post_idd,
                    link: linkpost,
                    message: this.messa +','+ this.mslinkp1,
                    url: this.urlImg,
                    maLoai: this.MaLoai,
                    loai: this.loaistt,
                    thuoc: this.tenpage,
                    postOf: 'page'
                  })
                  .subscribe((ress: any) => {
                    this.mess = ress.msg;
                    this.mss1 = ress.msg1;
                    if(this.mss1){
                      this.toastr.success(this.mss1,'Thông báo',{
                        timeOut:2000,
                        positionClass:'toast-bottom-right',
                      });
                    }else{
                      this.toastr.error(this.mess,'Lỗi',{
                        timeOut:2000,
                        positionClass:'toast-bottom-right',
                      });
                    }
                  });
                }
                
              }
            this.delay(2000).then((any) => {
              this.getMessage.setValue('');
              this.getLoaistt.setValue('null');
              this.getURLimg.setValue('');
            });
            }

          }
      });
    });
  }
  insertDraft() {
    this.MaLoai=null;
    this.loaistt = this.addForm.value.getLoaistt;
    this.mslinkp1 = this.addForm.value.mslinkp;
    this.idpage = $('#getidpage').val();
    this.messa = this.addForm.value.getMessage;

    this.urlImg = this.addForm.value.getURLimg;
    this.data.filter((item) => {
      if (item.id_Page === this.idpage) {
        this.tenpage = item.tenPage;
      }
    });
    if ((this.messa == null || this.messa=="")&&this.urlImg==null || this.loaistt == null ||this.loaistt == 'null') {

      this.toastr.warning(
        'Không được để trống Nội dung và Loại bài viết',
        'Nhắc nhở',
        {
          timeOut: 2000,
          positionClass: 'toast-bottom-right',
        }
      );
    } else {
      this.getloai.filter((item) => {
        if (item.loai === this.loaistt) {
          this.MaLoai = item.maLoai;
        }
      });
      if(this.mslinkp1==null||this.mslinkp1=='null'){
        this.baiDangFBService
        .createDraw({
          ID: this.idpage,
          message: this.messa +','+ this.mslinkp1,
          url: this.urlImg,
          maLoai: this.MaLoai,
          loai: this.loaistt,
          thuoc: this.tenpage,
          postOf: 'page'
        })
        .subscribe((ress: any) => {
          this.mess = ress.msg;
        this.mss1 = ress.msg1;
          if(this.mss1){
            this.toastr.success(this.mss1,'Thông báo',{
              timeOut:2000,
              positionClass:'toast-bottom-right',
            });
          }else{
            this.toastr.error(this.mess,'Lỗi',{
              timeOut:2000,
              positionClass:'toast-bottom-right',
            });
          }
        });
      this.delay(2000).then((any) => {
        this.getMessage.setValue('');
        this.getLoaistt.setValue('null');
        this.getURLimg.setValue('');
      });
      }else{
        this.baiDangFBService
        .createDraw({
          ID: this.idpage,
          message: this.messa +','+ this.mslinkp1,
          url: this.urlImg,
          maLoai: this.MaLoai,
          loai: this.loaistt,
          thuoc: this.tenpage,
          postOf: 'page'
        })
        .subscribe((ress: any) => {
          this.mess = ress.msg;
        this.mss1 = ress.msg1;
          if(this.mss1){
            this.toastr.success(this.mss1,'Thông báo',{
              timeOut:2000,
              positionClass:'toast-bottom-right',
            });
          }else{
            this.toastr.error(this.mess,'Lỗi',{
              timeOut:2000,
              positionClass:'toast-bottom-right',
            });
          }
        });
      }

      this.delay(2000).then((any) => {
        this.getMessage.setValue('');
        this.getLoaistt.setValue('null');
        this.getURLimg.setValue('');
      });
    }
  }

  changeTitle(d) {
    document.getElementById('title').innerText = 'Đăng bài cho Trang ' + d;
  }

  openDetailpage(detail) {
    this.modalService.open('detail-pagefb');
    this.text = detail.tenPage;
    this.getidss = detail.id_Page;
    this._changeDetailFB.setTitleFormPageFB(this.text);
    $('#id_P').val(detail.id_Page);
    this.myDetail.selectBaiDang(this.getidss);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
